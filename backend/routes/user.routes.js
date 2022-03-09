const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const uploadController = require("../controllers/upload.controller");
const password = require("../middleware/password.js");
const multer = require("multer");
const upload = multer();

router.post("/register", password, authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.put("/:id", userController.updateUser);

router.post("/upload", upload.single("file"), uploadController.uploadProfil);

module.exports = router;
