import axios from "axios";

/**
 * Add a tag to a playlist
 * @param {*} tag
 * @param {*} playlistInfo
 */
export const tagPlaylist = (tag, playlistInfo) => {
  return axios(`http://localhost:5000/playlist/tags`, {
    method: "PATCH",
    data: `tag=${tag}&playlistInfo=${playlistInfo}`,
    withCredentials: true
  });
};
