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
          // Found result
          if (result) {
            console.log("found result", result);
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
 * @param {User} user      - User following mongo user model.
 * @param {Tag} tag       - Tag to associate with the playlist.
 * @param {String} spotifyId - Id corresponding to a playlist on spotify.
 *
 */
export const tagPlaylist = async (user, tag, playlistInfo) => {
  const { spotifyId, name } = playlistInfo;

  return Playlist.findOne({ spotifyId }).then(playlist => {
    if (playlist) {
      playlist.tags.append(tag);
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
      user.playlists.append(newPlaylist);
      user.save();

      return { user, newPlaylist };
    }
  });
};
