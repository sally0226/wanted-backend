const PostModel = require('../models/postModel');

const writePost = async (req, res, next) => {
    try {
        if (req.user == null) throw new Error('Unauthorized');
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
        if (req.user == null) throw new Error('Unauthorized');
        const post_info = req.body;
        const user_id = req.user;
        post_info.updateAt = Date.now();
        await PostModel.updatePost(post_info, user_id);
        res.status(200).json({
            result : true,
            message: '글이 수정되었습니다.'
        });
    } catch(err){
        next(err);
    }
}
const deletePost = async (req, res, next) => {
    try {
        const post_id = req.params.post_id;
        if (req.user == null) throw new Error('Unauthorized');
        const user_id = req.user;
        await PostModel.deletePost(post_id, user_id);
        res.status(204).send();
    } catch(err){
        next(err);
    }
}
const getPostList = async (req, res, next) => {
    try {
        let page_num = Number(req.query.page_num);
        if (!page_num) page_num = 1;
        let offset = Number(req.query.offset); // 한 번에 보여줄 글 개수
        if (!offset) offset = 5;
        const { post_list, count }= await PostModel.getPostList(page_num, offset);
        const max_page = Math.ceil(count/offset);
        if (!post_list) res.status(404).json({max_page, message: '존재하지 않는 페이지 입니다.'});
        const list = post_list.map((post) => {return {_id: post._id, title: post.title}});
        res.status(200).json({max_page, list});
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
        if (err.message === 'no data') err.status = 404;
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