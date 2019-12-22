/**
 *  Authentication routes - Uses Spotify OAuth.
 */

import axios from "axios";
import express from "express";
import fs from "fs";
import { getSpotifyAuthHeader } from "../util";
import jwt from "jsonwebtoken";
import qs from "qs";
import User from "../models/User";

export default passport => {
  const router = express.Router();
  const redirect_uri = `${process.env.SERVER_URL}/auth/spotify/callback`;

  // Client request to login starts spotify OAuth flow.
  router.get("/login", (req, res) => {
    var scope = "playlist-read-collaborative streaming";
    res.redirect(
      "https://accounts.spotify.com/authorize?" +
        `client_id=${process.env.SPOTIFY_CLIENT_ID}` +
        `&response_type=code` +
        `&redirect_uri=${redirect_uri}` +
        `&scope=${scope}`
    );
  });

  // Receive callback from spotify OAuth
  router.get("/spotify/callback", (req, res) => {
    // Exchange received authorization code for tokens.
    axios
      .post(
        "https://accounts.spotify.com/api/token",
        qs.stringify({
          code: req.query.code,
          grant_type: "authorization_code",
          redirect_uri: redirect_uri // redirect to home page
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

        // Use tokens to get user profile from spotify
        return axios
          .get("https://api.spotify.com/v1/me", {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          })
          .then(profileResp => {
            const spotifyId = profileResp.data.id;

            // Search DB for user
            return User.find({ spotifyId }).then(userArr => {
              const [user] = userArr;

              if (user) return user;

              // Create a new user
              const newUser = new User({
                spotifyAuth: {
                  accessToken,
                  refreshToken,
                  tokenExp
                },
                spotifyId: profileResp.data.id,
                displayName: profileResp.data.display_name,
                profileImage: profileResp.data.images[0],
                profileUrl: profileResp.data.external_urls.spotify,
                spotifyApiUrl: profileResp.data.href
              });
              newUser.save();

              return newUser;
            });
          });
      })
      .then(user => {
        const privateKey = fs.readFileSync("./secrets/jwt_private.key", "utf8");
        const user_jwt = jwt.sign({ sub: user._id }, privateKey, {
          algorithm: "RS256"
        });
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
