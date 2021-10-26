const db = require('../database');
//  _id, user_id, createAt, updateAt, title, desc

const createPost = (post_info) => {
    return new Promise((resolve, reject) => {
        db.posts.insert(post_info, (err, newDoc) => {
            if (err) reject(err);
            else {
                // console.log(newDoc);
                resolve();
            }
        })
    })
}
const updatePost = (post_info, user_id) => {
    console.log(post_info);
    return new Promise((resolve, reject) => {
        db.posts.findOne({ _id: post_info._id }, function (err, doc) {
            if (err) reject(err);
            if (doc == null) reject(new Error("no data"));
            if (doc?.user_id !== user_id) reject(new Error("Forbidden"));
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
        db.posts.findOne({ _id: post_id }, function (err, doc) {
            if (err) reject(err);
            if (doc == null) reject(new Error("no data"));
            if (doc?.user_id !== user_id) reject(new Error("Forbidden"));
            if (doc !== null) {
                db.posts.remove({_id: post_id}, (err) => {
                    if (err) reject(err);
                    resolve();
                }); 
            }
        });
    });
}
module.exports = {
    createPost,
    updatePost,
    deletePost,
}
