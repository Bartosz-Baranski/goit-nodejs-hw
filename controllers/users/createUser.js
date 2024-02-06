import User from "../../models/users.js";


const createUser = async (req, res) => {
  try {
    const user = new User({
      email: req.body.email,
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
