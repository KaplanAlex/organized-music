import Playlist from "../models/Playlist";

/**
 * Transform received playlist objects from spotify to internal format.
 * Remove extraneous information and map to interal representation of
 * the playlist containing tags (if it exists).
 * @param {*} spotifyData - Playlist data - response from Spoity API
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
