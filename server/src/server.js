import cookieParser from "cookie-parser";
import express from "express";
import mongoose from "mongoose";
import passport from "passport";

import authRouter from "./routes/auth";
import playlistRouter from "./routes/playlist";
import tagRouter from "./routes/tag";
import userRouter from "./routes/user";
import { passportStrategy } from "./passport";

// Connect MongoDB
const dbUser = process.env.MONGO_USER;
const dbPassword = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://${dbUser}:${dbPassword}@organized-music-xt0uh.mongodb.net/test?retryWrites=true&w=majority`;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error", err));

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

// Initialize passport - cookieparser for retreiving jwt.
app.use(cookieParser());
passport.use(passportStrategy);

// Include routes
app.use("/auth", authRouter(passport));
app.use("/user", passport.authenticate("jwt", { session: false }), userRouter);
app.use("/tag", passport.authenticate("jwt", { session: false }), tagRouter);
app.use(
  "/playlist",
  passport.authenticate("jwt", { session: false }),
  playlistRouter
);

export default app;
