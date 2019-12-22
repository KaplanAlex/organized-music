/**
 *  Authentication routes - Uses Spotify OAuth.
 */

import axios from "axios";
import express from "express";
import qs from "qs";
import app from "../server";
import { getSpotifyAuthHeader } from "../util";

const router = express.Router();
const redirect_uri = `${process.env.SERVER_URL}/auth/spotify/callback`;

// Client request to login starts spotify OAuth flow.
router.get("/login", (req, res) => {
  var scope = "playlist-read-collaborative streaming";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      qs.stringify({
        response_type: "code",
        client_id: process.env.SPOTIFY_CLIENT_ID,
        redirect_uri,
        scope
      })
  );
});

// Receive callback from spotify OAuth
app.get("/spotify/callback", (req, res) => {
  const code = req.query.code || null;

  axios
    .post(
      "https://acounts.spotify.com/api/token",
      qs.stringify({
        code,
        redirect_uri,
        grant_type: "authorization_code"
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: getSpotifyAuthHeader()
        }
      }
    )
    .then(authResp => {
      const access_token = authResp.data.access_token;
      const refresh_token = authResp.data.refresh_token;

      // Get user information
      return axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${tokenResp.data.access_token}`
        }
      });
    })
    .then(profileResp => {
      //TODO save user
    })
    .then(userObj => {
      return res.redirect(
        `${process.env.CLIENT_URL}/?token=${createJWT(user._id)}`
      );
    })
    .catch(err => {
      return res.redirect(`${process.env.CLIENT_URL}/?err=${err}`);
    });
});

router.get("/refresh_token", (req, res) => {
  const { refresh_token } = req.body;
  axios
    .post(
      "https://acounts.spotify.com/api/token",
      qs.stringify({
        refresh_token,
        grant_type: "refresh_token"
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: getSpotifyAuthHeader()
        }
      }
    )
    .then(refreshResp => {
      res.send({ access_token: refreshResp.data.access_token });
    });
});

router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.json({ user: req.user });
  }
);
export default router;
