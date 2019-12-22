import express from "express";
import mongoose from "mongoose";

// Connect MongoDB
const dbUser = process.env.MONGO_USER;
const dbPassword = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://${dbUser}:${dbPassword}@organized-music-xt0uh.mongodb.net/test?retryWrites=true&w=majorityprocess.env.MONGO_URI`;
mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"));

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
