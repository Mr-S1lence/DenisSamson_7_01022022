const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const password = require('../middleware/password.js');


router.post('/register', password, authController.signUp);
router.post('/login', authController.signIn);
router.get('/logout', authController.logout);

router.get('/', userController.getAllUsers);
router.get('/:id', userController.userInfo);

module.exports = router;