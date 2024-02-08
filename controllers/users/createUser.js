import gravatar from "gravatar";
import bcrypt from "bcryptjs";
import User from "../../models/users.js";
import HttpError from "../../helpers/httpErrors/httpErrors.js";

const createUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user !== null) {
      throw HttpError(409, "Email in use");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const avatar = gravatar.url(email);
    await User.create({ email, password: passwordHash, avatar });

    res.status(201).send({ message: "Registration successfully" });
  } catch (error) {
    next(error);
  }
};

export default createUser;
