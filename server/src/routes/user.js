import { Router } from "express";

import { spotifyReq } from "../util/auth";

const router = Router();

router.get("/", (req, res) => {
  return res.json({ user: req.user });
});

router.get("/playlists", (req, res) => {
  const { user, query } = req;
  const { offset } = query;

  spotifyReq(
    {
      method: "get",
      url: `https://api.spotify.com/v1/me/playlists?offset=${offset}`
    },
    user
  )
    .then(resp => {
      return res.send(resp);
    })
    .catch(err => res.send(err));
});

router.post("/startPlayback", (req, res) => {
  const { user } = req;
  const { type, mediaId } = req.body;
  spotifyReq(
    {
      method: "put",
      url: `https://api.spotify.com/v1/me/player/play`,
      data: { context_uri: `spotify:${type}:${mediaId}` }
    },
    user
  ).catch(err => console.log("Error starting playback", err));

  return res.send("Received");
});

export default router;
