import { Router } from "express";
import axios from "axios";

const router = Router();

router.get("/", (req, res) => {
  return res.json({ user: req.user });
});

router.get("/search", (req, res) => {
  const { user } = req;
  const { q: search_val, tags } = req.query;
  const { accessToken } = user.spotifyAuth;

  axios
    .get("https://api.spotify.com/v1/me/playlists", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(spotifyResp => {
      console.log(spotifyResp.data);
    })
    .catch(err => console.log(err));

  res.send({ msg: search_val });
});

export default router;
