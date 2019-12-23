import express from "express";
import fs from "fs";
import mongoose from "mongoose";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";

import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import tagRouter from "./routes/tag";

import User from "./models/User";

// Connect MongoDB
const dbUser = process.env.MONGO_USER;
const dbPassword = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://${dbUser}:${dbPassword}@organized-music-xt0uh.mongodb.net/test?retryWrites=true&w=majority`;
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
const publicKey = fs.readFileSync("./secrets/jwt_public.key", "utf8");
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: publicKey,
  algorithms: ["RS256"]
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
app.use("/user", passport.authenticate("jwt", { session: false }), userRouter);
app.use("/tag", passport.authenticate("jwt", { session: false }), tagRouter);

export default app;
