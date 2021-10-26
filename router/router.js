const express = require('express');
const router = express.Router();

// import controllers 
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');

router.post('/user', userController.join); 
router.post('/token', userController.login); 
router.get('/token', userController.auth);

router.post('/post', postController.writePost);
router.patch('/post', postController.modifyPost);
router.delete('/post/:post_id', postController.deletePost);
router.get('/post/list/:page_num', postController.getPostList);
router.get('/post/:post_id', postController.getPostDetail);

module.exports = router; 