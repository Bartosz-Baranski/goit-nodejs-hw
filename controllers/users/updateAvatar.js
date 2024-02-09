import path from "path";
import Jimp from "jimp";
import fs from "fs";

import User from "../../models/users.js";
import { tempDir, storeImg } from "../../middleweare/upload.js";

const updateAvatar = async (req, res) => {
  const { path: tempUpdate } = req.file;
  const originalName = path.extname(tempUpdate);
  const filename = `${req.user.id}_${originalName}`;
  const resultUpload = path.join(storeImg, filename);

  //rename
  try {
    await fs.promises.rename(tempUpdate, resultUpload);
  } catch (err) {
    console.log(err);
    await fs.promises.unlink(tempUpdate); // Usuwanie pliku w przypadku błędu
    return res
      .status(500)
      .json({ error: "An error occurred while renaming the file." });
  }

  //resize
  try {
    const image = await Jimp.read(resultUpload);
    await image.resize(250, 250).writeAsync(resultUpload);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "An error occurred while processing the image." });
  }
  //update
  const avatarURL = filename;
  try {
    await User.findByIdAndUpdate(req.user.id, { avatarURL: avatarURL });
    res.status(200).json({ avatarURL: avatarURL });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "An error occurred while updating the avatar URL in the database.",
    });
  }
};

export default updateAvatar;
