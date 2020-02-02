import axios from "axios";

/**
 * Add a tag to a playlist
 * @param {*} tag
 * @param {*} playlistInfo
 */
export const tagPlaylist = (tag, playlistInfo) => {
  return axios(`${process.env.API_URL}/playlist/tags`, {
    method: "POST",
    data: `tag=${JSON.stringify(tag)}&playlistInfo=${JSON.stringify(
      playlistInfo
    )}`,
    withCredentials: true
  }).catch(error => {
    console.log("Error setting tag");
    if (error.response.data) {
      console.log(error.response.data);
    }
  });
};
