import Playlist from "../models/Playlist";
import User from "../models/User";

/**
 * Transform received playlist objects from spotify to internal format.
 * Remove extraneous information and map to interal representation of
 * the playlist containing tags (if it exists).
 * @param {Object} spotifyData - Playlist data - response from Spoity API
 */
export const transformSpotifyPlaylists = async spotifyPlaylists => {
  const playlists = await Promise.all(
    spotifyPlaylists.map(item => {
      // Pull out the relevant image
      item.image = item.images.length > 0 ? item.images[0].url : null;

      // Lookup the playlist
      item.interal = false;
      item.tags = {};
      return Playlist.findOne({ spotifyId: item.id })
        .then(result => {
          if (result) {
            item.tags = result.tags;
            item.internal = true;
          }

          return item;
        })
        .catch(err => console.log("MongoDB Playlist lookup error", err));
    })
  );

  return playlists;
};

/**
 * Save a tag to playlist with matching spotifyId. Save the playlist
 * if it is not yet associated with the user.
 *
 * Save the user after calling this function! Calling within can lead to
 * multiple saves which causes a mongodb error.
 * @param {User} user      - User following mongo user model.
 * @param {Tag} tag       - Tag to associate with the playlist.
 * @param {String} spotifyId - Id corresponding to a playlist on spotify.
 *
 */
export const tagPlaylist = async (user, tag, playlistInfo) => {
  const { spotifyId, name } = playlistInfo;

  return Playlist.findOne({ spotifyId, creatorId: user._id }).then(playlist => {
    if (playlist) {
      const dupTag =
        playlist.tags.filter(pTag => pTag._id == tag._id).length > 0;

      if (dupTag) {
        return {
          user,
          err: "This tag is already associated with this playlist"
        };
      }

      // Add the tag.
      playlist.tags.push(tag);
      playlist.save();
      return { user, playlist };
    } else {
      // Save the playlist
      const newPlaylist = new Playlist({
        name,
        spotifyId,
        creatorId: user._id,
        tags: [tag]
      });

      newPlaylist.save();
      user.playlists.push(newPlaylist);

      return { user, playlist: newPlaylist };
    }
  });
};
