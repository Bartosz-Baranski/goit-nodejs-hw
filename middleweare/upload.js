import multer from "multer";
import path from "path";

export const tempDir = path.join(process.cwd(), "temp");
export const storeImg = path.join(process.cwd(), "public/avatars");

const storageMulter = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${req.user.id}${file.originalname}`);
  },
});

const upload = multer({ storage: storageMulter });

export default upload;
