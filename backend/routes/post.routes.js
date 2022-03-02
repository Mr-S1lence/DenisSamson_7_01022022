const router = require('express').Router();
const postController = require('../controllers/post.controller');
const multer = require('multer');
const upload = multer();


router.get('/', postController.readPost);
router.post('/', upload.single('file'), postController.createPost);
router.patch('/like-post/:id', postController.likePost);


module.exports = router;