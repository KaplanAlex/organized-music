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
 * PATCH "/playlists/tags"
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
router.patch("/tags", (req, res) => {
  var { user } = req;
  var { tag, playlistInfo } = req.body;

  // If only the value is passed, the tag is new.

  if (!tag._id) {
    newTag = createTag(user, tag);
    if (newTag.err) {
      return res.status(400).send({ err: new_tag.err });
    }

    // The created tag was saved to the user. Update the reference.
    user = newTag.user;
    tag = newTag.newTag;
  }

  // Add the tag to the playlist. Save the playlist if it's new
  tagPlaylist(user, tag, playlistInfo).then(updatedPlaylist =>
    res.send(updatedPlaylist)
  );
});

export default router;
