//const router = require("express").Router();
import express from "express";
const router = express.Router();

//const commentController = require("../controllers/comment.controller");
import commentController from "../controllers/comment.controller.js";

//const multer = require("multer");
import multer from "multer";
const upload = multer();

router.post("/:id", commentController.createComment);
router.get("/:id", commentController.readComment);
router.put("/edit-comment/", commentController.updateComment);
router.patch("/delete-comment-post/:id", commentController.deleteComment);

//module.exports = router;
export default router;
