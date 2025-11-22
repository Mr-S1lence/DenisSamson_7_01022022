//const router = require("express").Router();
import express from "express";
const router = express.Router();

//const authController = require("../controllers/auth.controller");
// import authController from "../controllers/auth.controller.js";
// import { logout } from '../controllers/auth.controller.js';
import { signUp, signIn, logout } from "../controllers/auth.controller.js";

//const userController = require("../controllers/user.controller");
import userController from "../controllers/user.controller.js";

//const uploadController = require("../controllers/upload.controller");
import uploadController from "../controllers/upload.controller.js";

//const password = require("../middleware/password.js");
import password from "../middleware/password.js";

//const multer = require("multer");
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

//module.exports = router;
export default router;
