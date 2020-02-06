import Playlist from "../models/Playlist";
import User from "../models/User";

/**
 * Convert external playlist object to excepted form.
 * @param {*} playlist - Playlist object from spotify api
 */
export const formatSpotifyPlaylist = playlist => ({
  name: playlist.name,
  description: playlist.description,
  spotifyId: playlist.id,
  imageURL: playlist.images.length > 0 ? playlist.images[0].url : null,
  tags: [],
  internal: false
});

export const formatInteralPlaylist = playlist => ({
  name: playlist.name,
  description: playlist.description,
  spotifyId: playlist.spotifyId,
  imageURL: playlist.imageURL,
  tags: playlist.tags,
  internal: true
});

/**
 * Transform received playlist objects from spotify to internal format.
 * Remove extraneous information and map to interal representation of
 * the playlist containing tags (if it exists).
 * @param {Object} spotifyData - Playlist data - response from Spoity API
 */
export const transformSpotifyPlaylists = async spotifyPlaylists => {
  const playlists = await Promise.all(
    spotifyPlaylists.map(item => {
      const formatted = formatSpotifyPlaylist(item);

      // Lookup the playlist
      return Playlist.findOne({ spotifyId: formatted.spotifyId })
        .then(result => {
          if (result) {
            formatted.tags = result.tags;
            formatted.internal = true;
          }

          return formatted;
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
  const { spotifyId, name, description, imageURL } = playlistInfo;

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
      playlist.tags.unshift(tag);

      // Update fields - Minor improvement on stale data
      playlist.name = name;
      playlist.description = description;
      playlist.imageURL = imageURL;
      playlist.save();

      // Update playlist in user.
      user.playlists = user.playlists.filter(p => p.spotifyId != spotifyId);
      user.playlists.unshift(playlist);

      const formattedPlaylist = formatInteralPlaylist(playlist);
      return { user, playlist: formattedPlaylist };
    } else {
      // Save the playlist
      const newPlaylist = new Playlist({
        name,
        description,
        spotifyId,
        imageURL,
        creatorId: user._id,
        tags: [tag]
      });

      newPlaylist.save();
      user.playlists.unshift(newPlaylist);

      return { user, playlist: formatInteralPlaylist(newPlaylist) };
    }
  });
};
