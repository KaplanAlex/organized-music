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
      method: "GET",
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
      method: "PUT",
      url: `https://api.spotify.com/v1/me/player/play`,
      data: { context_uri: `spotify:${type}:${mediaId}` }
    },
    user
  ).catch(err => {
    console.log("Error starting playback", err.err.response);
  });

  return res.send("Received");
});

router.get("/search", (req, res) => {
  const { user, query } = req;
  const { name, types } = query;

  const baseURL = "https://api.spotify.com/v1/search";
  const q = `${name}&type=${types}`;

  spotifyReq(
    {
      method: "GET",
      url: `${baseURL}?q=${q}`
    },
    user
  )
    .then(searchResp => {
      console.log(searchResp);
      res.send(searchResp);
    })
    .catch(err => {
      console.log("Error in search", err);
      res.send(err);
    });
});

export default router;
