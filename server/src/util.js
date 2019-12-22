export const getSpotifyAuthHeader = () => {
  const spotifyCodes = `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`;
  const encoded =
    "Basic " +
    Buffer.alloc(spotifyVales.length, spotifyCodes).toString("base64");
  return encoded;
};
