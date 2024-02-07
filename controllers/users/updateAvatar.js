import path from "path";
import Jimp from "jimp";
import fs from "fs";

const avatarsDir = path.join("../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);
  Jimp.read(tempUpload, (err, image) => {
    if (err) return next(notFoundHttpError(err));
    image.resize(250, 250).write(resultUpload);
  });
  await fs.unlink(tmpUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};
export default updateAvatar;
