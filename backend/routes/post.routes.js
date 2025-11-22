//const router = require("express").Router();
import express from "express";
const router = express.Router();

//const postController = require("../controllers/post.controller");
import postController from "../controllers/post.controller.js";

//const multer = require("multer");
import multer from "multer";
const upload = multer();

router.get("/", postController.readPost);
router.post("/", upload.single("file"), postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);

router.patch("/like-post/:id", postController.likePost);
router.patch("/unlike-post/:id", postController.unlikePost);
router.get("/get-like-post-user/:id", postController.getLikePostByUser);

//module.exports = router;
export default router;