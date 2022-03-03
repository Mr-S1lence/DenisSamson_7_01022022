const router = require('express').Router();
const commentController = require('../controllers/comment.controller');
const multer = require('multer');
const upload = multer();


router.post('/:id', commentController.createComment);
router.get('/:id', commentController.readComment);
router.put('/edit-comment/', commentController.updateComment);

module.exports = router;