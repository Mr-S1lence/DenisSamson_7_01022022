import express from "express";
const router = express.Router();

import commentController from "../controllers/comment.controller.js";

import multer from "multer";
const upload = multer();

router.post("/:id", commentController.createComment);
router.get("/:id", commentController.readComment);
router.put("/edit-comment/", commentController.updateComment);
router.patch("/delete-comment-post/:id", commentController.deleteComment);

export default router;
