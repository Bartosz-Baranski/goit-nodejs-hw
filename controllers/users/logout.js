import User from "../../models/users.js";

const logout = async (req, res, next) => {
  const { id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json();
};

export default logout;
