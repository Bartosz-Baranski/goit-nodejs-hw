import User from "../../models/users.js";
import transporter from "../shared/mail.service.js";

const resendVerifyEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw HttpError(400, "missing required field email");
    }

    if (user.verify) {
      throw HttpError(400, "Verification has already been passed");
    }

    const emailOptions = {
      to: email,
      from: "bartosz.baranski1990@gmail.com",
      subject: "Verify Email",
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Click verify email</a>`,
    };
    transporter
      .sendMail(emailOptions)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });

    res.json({ message: "Verification email sent" });
  } catch (error) {
    next(error);
  }
};

export default resendVerifyEmail;
