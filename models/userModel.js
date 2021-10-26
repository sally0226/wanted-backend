const db = require('../database');
// user_id, user_pw, user_name, user_email

const createUser = async (user_info) => {
    return new Promise((resolve, reject) => {
        db.users.insert(user_info, (err) => {
            if (err) reject(err);
            else resolve();
        });
        
    });
}
const authorization = (user_info) => {
    const { user_id, user_pw } = user_info;
    return new Promise((resolve, reject) => {
        db.users.findOne({user_id, user_pw}, (err, doc)=>{
            console.log(doc);
            if (err) reject(err);
            else if (doc == null) reject(new Error("no data"));
            resolve();
        });
    })
}
const isExistUser = (user_id) => {
    return new Promise((resolve, reject) => {
        db.users.findOne({user_id}, (err, doc)=> {
            if (err) reject(err);
            else if (doc == null) reject(new Error("no data"));
            resolve(); 
        })
    })
}
module.exports = {
    createUser,
    authorization,
    isExistUser,
};