import server from "./server/src/server";

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Ready at http://localhost:${PORT}`);
});
