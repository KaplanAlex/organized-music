import axios from "axios";

export const getSpotifyLibraryPlaylists = offset => {
  return axios
    .get(`http://localhost:5000/user/playlists?offset=${offset}`, {
      withCredentials: true
    })
    .then(playlistResp => {
      const { items, offset, limit, total } = playlistResp.data;

      // Only pass the relevant image.
      const playlists = items.map(item => {
        item.image = item.images ? item.images[0].url : null;
        return item;
      });

      const nextOffset = offset + limit;
      return { playlists, nextOffset, total };
    })
    .catch(err => console.log("Error retreving playlists", err));
};

export const playSpotifyPlaylist = playlistId => {
  const formData = new FormData();
  formData.append("type", "playlist");
  formData.append("withCredentials", true);
  return axios("http://localhost:5000/user/startPlayback", {
    method: "post",
    data: formData,
    withCredentials: true
  })
    .then(playResp => console.log("Playling should've started", playResp))
    .catch(err => console.log("Error occurred when starting playback", err));
};
