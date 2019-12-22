export const getSpotifyAuthHeader = () => {
  const spotifyValues = `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`;
  return (
    "Basic " +
    Buffer.alloc(spotifyVales.length, spotifyValues).toString("base64")
  );
};
