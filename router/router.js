const express = require('express');
const router = express.Router();

// import controllers 
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');

router.post('/user', userController.join); 
router.post('/token', userController.login); // token 발급 == 로그인
router.get('/token', userController.auth);

router.post('/post', postController.writePost);
router.patch('/post', postController.modifyPost);
router.delete('/post/:postId', postController.deletePost);

module.exports = router; 