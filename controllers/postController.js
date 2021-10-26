const PostModel = require('../models/postModel');

const writePost = async (req, res, next) => {
    try {
        if (req.user == null) throw 'Unauthorized';
        const post_info = req.body; // title, desc
        post_info.createAt = Date.now();
        post_info.user_id = req.user;
        const post_id = await PostModel.createPost(post_info);
        res.status(201).json({
            result : true,
            post_id,
            message: '글이 등록되었습니다.'
        });
    } catch(err){
        next(err);
    }
}
const modifyPost = async (req, res, next) => {
    try {
        if (req.user == null) throw 'Unauthorized';
        const post_info = req.body;
        const user_id = req.user;
        post_info.updateAt = Date.now();
        await PostModel.updatePost(post_info, user_id);
        res.status(201).json({result : true});
    } catch(err){
        next(err);
    }
}
const deletePost = async (req, res, next) => {
    try {
        const post_id = req.params.post_id;
        const user_id = req.user;
        if (req.user == null) throw 'Unauthorized';
        await PostModel.deletePost(post_id, user_id);
        res.status(204).send();
    } catch(err){
        next(err);
    }
}
const getPostList = async (req, res, next) => {
    try {
        const page_num = req.params.page_num;
        const post_num = 10; // 한 번에 보여줄 글 개수
        const post_list = await PostModel.selectPosts(page_num, post_num);
        const simple_list = post_list.map((post) => {return {_id: post._id, title: post.title}});
        res.status(200).json(simple_list);
    } catch(err){
        next(err);
    }
}
const getPostDetail = async (req, res, next) => {
    try {
        const post_id = req.params.post_id;
        const post = await PostModel.selectPost(post_id);
        res.status(200).json(post);
        
    } catch(err){
        next(err);
    }
}
module.exports = {
    writePost,
    modifyPost,
    deletePost,
    getPostList,
    getPostDetail
}