import express from "express";

import createUser from "../../controllers/users/createUser.js";
import login from "../../controllers/users/auth.js";
import logout from "../../controllers/users/logout.js";
import getCurrent from "../../controllers/users/current.js";
import upload from "../../middleweare/upload.js";
import authMidd from "../../middleweare/auth.middleweare.js";

import updateAvatar from "../../controllers/users/updateAvatar.js";
import verify from "../../controllers/users/verification.js";
import resendVerifyEmail from "../../controllers/users/resendVerifi.js";

export const router = express.Router();

router.post("/signup", createUser);
router.post("/login", login);
router.post("/logout", authMidd, logout);
router.get("/current", authMidd, getCurrent);
router.patch("/avatars", authMidd, upload.single("avatar"), updateAvatar);
router.get("/verify/:verificationToken", verify);
router.post("/verify", resendVerifyEmail);
