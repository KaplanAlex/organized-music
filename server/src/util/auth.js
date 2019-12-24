import axios from "axios";
import qs from "qs";

/**
 * Utility to manage token refresh with spotify API calls.
 *
 * NOTE: Currently, if multiple call are made while the access token is
 * expired, a new access token will be generated with each request. All of
 * these access tokens will be valid and each will be saved the the user object.
 * All but one will be overwritten. This is uncessary work which can be avoiced
 * by queuing all requests until the token is refreshed.
 *
 *  Can be moved to an axios interceptor
 * @param {Object} axiosConfig - Request information (i.e. tye, url)
 * @param {UserObject} user - Current user. Required to store updated
 * accessToken when refreshes are necessary.
 */
export const spotifyReq = (axiosConfig, user) => {
  const { accessToken } = user.spotifyAuth;

  axiosConfig.headers = {
    Authorization: `Bearer ${accessToken}`
  };

  return axios(axiosConfig)
    .then(spotifyResp => spotifyResp.data)
    .catch(err => {
      // Catch expired access token error
      if (err.response.status == 401) {
        return refreshOauth(user)
          .then(newToken => {
            // Re attempt with updated token
            axiosConfig.headers = {
              Authorization: `Bearer ${newToken}`
            };

            return axios(axiosConfig)
              .then(spotifyResp => spotifyResp.data)
              .catch(err =>
                Promise.reject({
                  err,
                  msg: "Request error with new access token"
                })
              );
          })
          .catch(err => {
            return Promise.reject({ err, msg: "Refresh error - logout" });
          });
      }

      return Promise.reject({ err, msg: "Not 401 spotify error" });
    });
};

/**
 * Exchange a refresh token for a new access token.
 * Called when 401 responses result from expired access tokens.
 * Can move this to an axios interceptor in the future.
 * @param {String} refreshToken
 */
export const refreshOauth = user => {
  const { refreshToken } = user.spotifyAuth;
  return axios
    .post(
      "https://accounts.spotify.com/api/token",
      qs.stringify({
        refresh_token: refreshToken,
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
      user.spotifyAuth.accessToken = refreshResp.data.access_token;
      user.save();
      return refreshResp.data.access_token;
    })
    .catch(err => {
      return Promise.reject({ err, msg: "Refresh error" });
    });
};

/**
 * Construct authorization header for spotify API calls.
 */
export const getSpotifyAuthHeader = () => {
  const spotifyCodes = `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`;
  const encoded =
    "Basic " +
    Buffer.alloc(spotifyCodes.length, spotifyCodes).toString("base64");
  return encoded;
};
