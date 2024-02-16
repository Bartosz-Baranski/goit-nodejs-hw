import gravatar from "gravatar";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import User from "../../models/users.js";
import HttpError from "../../helpers/httpErrors/httpErrors.js";
import transporter from "../shared/mail.service.js";

const createUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user !== null) {
      throw HttpError(409, "Email in use");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const avatar = gravatar.url(email);
    const verifyToken = nanoid();

    const emailOptions = {
      to: email,
      from: "bartosz.baranski1990@gmail.com",
      subject: "Verify Email",
      html: `To confirm your registration please click on the <a href="http://localhost:3000/api/users/verify/${verifyToken}">link</a>`,
      text: `To confirm your registration please open the link http://localhost:3000/api/users/verify/${verifyToken}`,
    };
    transporter
      .sendMail(emailOptions)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });

    await User.create({
      email,
      password: passwordHash,
      avatarURL: avatar,
      verificationToken: verifyToken,
    });

    res
      .status(201)
      .send({
        message:
          "Registration successfully, verification email send to your email",
      });
  } catch (error) {
    next(error);
  }
};

export default createUser;
