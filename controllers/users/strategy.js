import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { configDotenv } from "dotenv";
configDotenv();

import User from "../../models/users.js";

const authStrategy = new Strategy(
  {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
  },
  (payload, done) => {
    User.findOne({ _id: payload.id })
      .then((user) => {
        if (user) {
          return done(null, user);
        }
        return done("Not authorized");
      })
      .catch((err) => {
        return done(err);
      });
  }
);

passport.use(authStrategy);

export default authStrategy;
