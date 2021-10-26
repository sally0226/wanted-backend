const PostModel = require('../models/postModel');

const writePost = async (req, res, next) => {
    try {
        if (req.user == null) throw 'Unauthorized';
        const post_info = req.body; // title, desc
        post_info.createAt = Date.now();
        post_info.user_id = req.user;
        await PostModel.createPost(post_info);
        res.status(201).json({result : true});
    } catch(err){
        next(err);
    }
}
const modifyPost = async (req, res, next) => {
    try {
        if (req.user == null) throw 'Unauthorized';
        const post_info = req.body; // title, desc
        const user_id = req.user;
        post_info.updateAt = Date.now();
        await PostModel.updatePost(post_info, user_id);
        res.status(201).json({result : true});
    } catch(err){
        next(err);
    }
}
const deletePost = async (req,res,next) => {
    try {
        const post_id = req.params.postId;
        console.log(post_id);
        const user_id = req.user;
        console.log(user_id);
        await PostModel.deletePost(post_id, user_id);
        res.status(204).send();
    } catch(err){
        next(err);
    }
}
module.exports = {
    writePost,
    modifyPost,
    deletePost,

}