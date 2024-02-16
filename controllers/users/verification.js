import User from "../../models/users.js";

async function verify(req, res, next) {
  const { token } = req.params;

  try {
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });

    res.send({ message: "Verification successful" });
  } catch (error) {
    next(error);
  }
}

export default verify;
