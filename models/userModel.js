const db = require('../database');
// user_id, user_pw, user_name

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
            if (err) reject(err);
            else if (doc == null) reject(new Error('id나 pw를 확인해주세요.'));
            resolve();
        });
    })
}
const isExistUser = (user_id) => {
    return new Promise((resolve, reject) => {
        db.users.findOne({user_id}, (err, doc)=> {
            if (err) reject(err);
            else if (doc == null) reject(new Error('존재하지 않는 회원정보입니다.'));
            resolve(); 
        })
    })
}
module.exports = {
    createUser,
    authorization,
    isExistUser,
};