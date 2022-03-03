const router = require('express').Router();
const commentController = require('../controllers/comment.controller');
const multer = require('multer');
const upload = multer();




router.get('/:id', commentController.readComment);
router.post('/:id', commentController.createComment);

module.exports = router;