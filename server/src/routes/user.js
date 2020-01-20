import { Router } from "express";

import { spotifyReq } from "../util/auth";
import { transformSpotifyPlaylists } from "../services/playlist";

const router = Router();

router.get("/", (req, res) => {
  return res.json({ user: req.user });
});

router.get("/playlists", (req, res) => {
  const { user, query } = req;
  const { offset } = query;

  return spotifyReq(
    {
      method: "GET",
      url: `https://api.spotify.com/v1/me/playlists?offset=${offset}`
    },
    user
  )
    .then(resp => {
      // Pass next offset, total for paginated searching
      const { items, offset, limit, total } = resp;
      const nextOffset = offset + limit;

      // Map playlists to internal playlist if exists.
      return transformSpotifyPlaylists(items).then(playlists => {
        const transformed = { playlists, nextOffset, total };

        return res.send(transformed);
      });
    })
    .catch(err => res.send(err));
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
      const { playlists } = searchResp;
      const { items, offset, limit, total } = playlists;
      const nextOffset = offset + limit;

      return transformSpotifyPlaylists(items).then(newPlaylists => {
        const transformed = { playlists: newPlaylists, nextOffset, total };
        res.send(transformed);
      });
    })
    .catch(err => {
      console.log("Error in search", err);
      res.send(err);
    });
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

export default router;
