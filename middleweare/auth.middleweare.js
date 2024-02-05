import passport from "passport";
import authStrategy from "../controllers/users/strategy.js";

const authMidd = (req, res, next) => {
  passport.authenticate(authStrategy, (err, user) => {
    if (err || !user) {
      return res
        .status(401)
        .json({ message: "Not authorized, token is invalid" });
    }
    req.user = user;
    next();
  })(req, res, next);
};

export default authMidd;
