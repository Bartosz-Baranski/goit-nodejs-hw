import User from "../../models/users.js";
import gravatar from "gravatar";

const createUser = async (req, res) => {
  const avatar = gravatar.url(req.body.email);
  try {
    const user = new User({
      email: req.body.email,
      avatarURL: avatar,
    });
    user.setPassword(req.body.password);

    await user.save();
    return res.status(201).json({ data: user });
  } catch (err) {
    console.log(err);
    return res.status(409).json({ message: "Email in use" });
  }
};

export default createUser;
