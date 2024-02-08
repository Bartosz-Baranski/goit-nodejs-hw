import path from "path";
import Jimp from "jimp";
import fs from "fs";

import { tempDir, storeImg } from "../../middleweare/upload.js";

const updateAvatar = async (req, res) => {
  const { path: tempDir, originalname } = req.file;
  const filename = `${req.user.id}_${originalname}`;
  const resultUpload = path.join(storeImg, filename);
  Jimp.read(tempDir, (err, image) => {
    if (err) return next(err);
    image.resize(250, 250).write(resultUpload);
  });
  await fs.rename(tempDir, resultUpload);
  fs.unlink(tempDir);
  const avatarURL = filename;
  await User.findByIdAndUpdate(req.user.id, { avatar: avatarURL });
  res.status(200).json({ avatar: avatarURL });
};
export default updateAvatar;
