import axios from "axios";

/**
 * Retreive a set of the user's saved playlists from spotify.
 * Returns "limit" (20) playlists and the total number of saved playlists.
 * @param {int} offset - Index to start playlist retreival from.
 */
export const getSpotifyLibraryPlaylists = offset => {
  return axios
    .get(`${process.env.API_URL}/user/playlists?offset=${offset}`, {
      withCredentials: true
    })
    .then(playlistResp => playlistResp.data)
    .catch(err => console.log("Error retreving playlists", err));
};

/**
 * Starts playback of the playlist with id playlistId.
 * @param {String} playlistId - Identifier for the selected
 * playlist.
 */
export const playSpotifyPlaylist = playlistId => {
  const formData = new FormData();
  formData.append("type", "playlist");
  formData.append("withCredentials", true);
  return axios(`${process.env.API_URL}/user/startPlayback`, {
    method: "POST",
    data: `type=playlist&mediaId=${playlistId}`,
    withCredentials: true
  }).catch(err => console.log("Error occurred when starting playback", err));
};

/**
 * Search spotify for a playlist matching the input name.
 * @param {*} playlistName - Playlist name to match.
 */
export const searchSpotifyPlaylists = playlistName => {
  const baseURL = process.env.API_URL;
  const route = "/user/search";
  const params = `?name=${playlistName}&types=playlist`;
  const query = baseURL + route + params;
  return axios
    .get(query, {
      withCredentials: true
    })
    .then(playlistResp => playlistResp.data);
};
