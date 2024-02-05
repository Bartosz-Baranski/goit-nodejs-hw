import User from "../../models/users.js";
import JsonWebToken from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.validPassword(password)) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }

  const token = JsonWebToken.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({ token, user: { email, subscription: "starter" } });

  console.log("haslo i email poprawne");
};

export default login;
