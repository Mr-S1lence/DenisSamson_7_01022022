import express from "express";
const router = express.Router();

import { signUp, signIn, logout } from "../controllers/auth.controller.js";

import userController from "../controllers/user.controller.js";

import uploadController from "../controllers/upload.controller.js";

import password from "../middleware/password.js";

import multer from "multer";
const upload = multer();

router.post("/register", password, signUp);
router.post("/login", signIn);
router.get("/logout", logout);

router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.put("/:id", userController.updateUser);

router.post("/upload", upload.single("file"), uploadController.uploadProfil);

router.post("/desactivate/:id", userController.desactivateUser);

export default router;
