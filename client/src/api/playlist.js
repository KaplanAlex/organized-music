import axios from "axios";

/**
 * Add a tag to a playlist
 * @param {*} tag
 * @param {*} playlistInfo
 */
export const tagPlaylist = (tag, playlist) => {
  const { spotifyId, name, description, imageURL } = playlist;
  const playlistInfo = { spotifyId, name, description, imageURL };
  return axios(`${process.env.API_URL}/playlist/tags`, {
    method: "POST",
    data: `tag=${JSON.stringify(tag)}&playlistInfo=${JSON.stringify(
      playlistInfo
    )}`,
    withCredentials: true
  })
    .then(resp => {
      const { user, playlist } = resp.data;
      return { updatedUser: user, updatedPlaylist: playlist };
    })
    .catch(error => {
      console.log("Error setting tag");
      if (error.response.data) {
        console.log(error.response.data);
      }
    });
};
