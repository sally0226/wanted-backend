const db = require('../database');
//  _id, user_id, createAt, updateAt, title, desc

const createPost = (post_info) => {
    return new Promise((resolve, reject) => {
        db.posts.insert(post_info, (err, newDoc) => {
            if (err) reject(err);
            else resolve(newDoc._id);
        });
    });
}
const updatePost = (post_info, user_id) => {
    return new Promise((resolve, reject) => {
        db.posts.findOne({ _id: post_info._id }, function (err, doc) {
            if (err) reject(err);
            if (doc == null) reject(new Error('no data'));
            if (doc?.user_id !== user_id) reject(new Error('Forbidden'));
            if (doc !== null) {
                db.posts.update({_id: post_info._id}, post_info, (err) => {
                    if (err) reject(err);
                    resolve();
                }); 
            }
        });
    });
}
const deletePost = (post_id, user_id) => {
    return new Promise((resolve, reject) => {
        db.posts.findOne({ _id: post_id }, (err, doc) => {
            if (err) reject(err);
            if (doc == null) reject(new Error('no data'));
            if (doc?.user_id !== user_id) reject(new Error('Forbidden'));
            if (doc !== null) {
                db.posts.remove({_id: post_id}, (err) => {
                    if (err) reject(err);
                    resolve();
                }); 
            }
        });
    });
}
const getPostList = (page_num, offset) => {
    return new Promise((resolve, reject)=> {
        let count;
        db.posts.count({},(err,n)=>{
            if (err) reject(err);
            count = n;
            if (count < (page_num-1)*offset+1) resolve({count});
        });
        db.posts.find({}).sort({createAt: -1}) //-1 : 내림차순, 1 : 오름차순
            .skip(page_num-1).limit(offset)
            .exec((err, docs) =>{
                if (err) reject(err);
                resolve({post_list: docs, count});
            });
    });
}
const selectPost = (post_id) => {
    return new Promise((resolve, reject) => {
        db.posts.findOne({_id: post_id}, (err, doc) => {
            if (err) reject(err);
            if (doc == null) reject(new Error('no data'))
            resolve(doc);
        });
    });
}
module.exports = {
    createPost,
    updatePost,
    deletePost,
    getPostList,
    selectPost
}
