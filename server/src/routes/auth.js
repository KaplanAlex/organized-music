/**
 *  Authentication routes - Uses Spotify OAuth.
 */

import axios from "axios";
import express from "express";
import { getSpotifyAuthHeader } from "../util";
import jwt from "jsonwebtoken";
import qs from "qs";
import User from "../models/User";

const router = express.Router();
const redirect_uri = `${process.env.SERVER_URL}/auth/spotify/callback`;

export default passport => {
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
  router.get("/spotify/callback", (req, res) => {
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
        const accessToken = authResp.data.access_token;
        const refreshToken = authResp.data.refresh_token;
        const tokenExp = Date.now() + authResp.data.expires_in * 1000;

        // Get user information
        return axios.get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${tokenResp.data.access_token}`
          }
        });
      })
      .then(profileResp => {
        const spotifyId = profileResp.data.id;
        // Search DB for user
        var user = User.find({ spotifyId });

        // Create a new user
        if (!user) {
          user = new User({
            spotifyAuth: {
              accessToken,
              refreshToken,
              tokenExpAt
            },
            spotifyId: profileResp.data.id,
            displayName: spotifyMeResp.data.display_name,
            profileImage: spotifyMeResp.data.images[0],
            profileUrl: spotifyMeResp.data.external_urls.spotify,
            spotifyApiUrl: spotifyMeResp.data.href
          });
          user.save();
        }

        return user;
      })
      .then(user => {
        const user_jwt = jwt.sign(
          { sub: user._id },
          process.env.SECRET_WEB_TOKEN,
          { algorithm: "RS256" }
        );
        return res.redirect(`${process.env.CLIENT_URL}/?token=${user_jwt}`);
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

  return router;
};
