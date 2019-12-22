import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";

import authRouter from "./routes/auth";

// Connect MongoDB
const dbUser = process.env.MONGO_USER;
const dbPassword = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://${dbUser}:${dbPassword}@organized-music-xt0uh.mongodb.net/test?retryWrites=true&w=majorityprocess.env.MONGO_URI`;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
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

// Initialize passport
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_WEB_TOKEN
};
passport.use(
  new Strategy(jwtOptions, (payload, done) => {
    User.findById(payload.sub)
      .then(user => {
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      })
      .catch(err => {
        console.log("jwt strategy error:", err);
        done(err);
      });
  })
);

// Include routes
app.use("/auth", authRouter(passport));

export default app;
