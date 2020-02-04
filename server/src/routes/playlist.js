import { Router } from "express";
import { tagPlaylist } from "../services/playlist";
import { createTag } from "../services/tag";

const router = Router();

/**
 * GET "/playlists/"
 * Return all of the user's tagged playlists
 */
router.get("/", (req, res) => {
  const { user } = req;
  return res.send({ playlists: user.playlists });
});

/**
 * POST (Shold be PATCH but this is currently blocked by cors) "/playlists/tags"
 * Add a tag to a playlists set of tags.
 * Create the tag if it is new
 * Create the playlist if it's new
 * Body: {
 *  tag: {
 *    value: String,
 *    creator_id (Optional): String,
 *    _id (Optional): String
 *  }
 *  playlistInfo: {
 *    name: String,
 *    spotifyId: String
 *  }
 * }
 */
router.post("/tags", (req, res) => {
  var { user } = req;
  var { tag, playlistInfo } = req.body;
  tag = JSON.parse(tag);
  playlistInfo = JSON.parse(playlistInfo);

  // If only the value is passed, the tag is new.
  if (!tag._id) {
    const createResp = createTag(user, tag);
    if (createResp.err) {
      return res.status(400).send(createResp.err);
    }

    // The created tag was added to the user. Update the reference.
    user = createResp.user;
    tag = createResp.newTag;
  }

  // Add the tag to the playlist. Save the playlist if it's new
  tagPlaylist(user, tag, playlistInfo).then(updatedPlaylist => {
    // Save the user - must be done after all transactions
    updatedPlaylist.user.save();

    // Catch duplicate assignment.
    if (updatedPlaylist.err) {
      return res.status(400).send(updatedPlaylist);
    }

    // Return the updated user and new playlist to the client
    res.send(updatedPlaylist);
  });
});

export default router;
