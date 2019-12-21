import express from "express";

// Initialize express server
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowCrossDomain = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
};
app.use(allowCrossDomain);

export default app;
