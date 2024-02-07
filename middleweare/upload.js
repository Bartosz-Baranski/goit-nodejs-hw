import multer from "multer";
import path from "path";

const destinationFolder = path.join("../", "tmp");

const storageMulter = multer.diskStorage({
  destination: destinationFolder,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage: storageMulter });
