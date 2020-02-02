import fs from "fs";
import { Strategy, ExtractJwt } from "passport-jwt";

import User from "./models/User";

/**
 * Extracts a cookie named "jwt" from the request
 * Used to validate the user.
 *
 * ** Requires cookie-parser **
 * @param {*} req - Express request
 */
const cookieExtractor = function(req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }

  return token;
};

// const publicKey = fs.readFileSync(
//   `${process.env.SECRET_PATH}/jwt_public.key`,
//   "utf8"
// );
const publicKey = process.env.JWT_PUBLIC_KEY.split("\\n").join("\n");
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: publicKey,
  algorithms: ["RS256"]
};

/**
 * Strategy using httpOnly cookie jwt storage.
 * Expects sub field with MongoDB user_id.
 */
export const passportStrategy = new Strategy(jwtOptions, (payload, done) => {
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
});
