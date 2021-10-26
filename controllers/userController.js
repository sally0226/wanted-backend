const UserModel = require('../models/userModel');
const { createToken } = require('../libs/token');

const join = async (req, res, next) => {
    try {
        const user_info = req.body;
        await UserModel.createUser(user_info);
        res.status(201).json({result : true, message: '회원가입이 완료되었습니다.'});
    } catch(err){
        if (err.errorType == 'uniqueViolated')
            err.status = 404;
            err.message = '중복된 id입니다.'
        next(err);
    }
}
const login = async (req, res, next) => {
    try {
        const user_info = req.body;
        await UserModel.authorization(user_info);
        const user_id = user_info.user_id;
        const token = createToken({user_id});
        res.cookie('access_token', token, {
            httpOnly:true, sameSite: 'none', secure: true
        });
        res.status(200).json({
            result:true,
            user_id,
            message: '로그인에 성공했습니다.'
        });
    } catch(err){
        if (err.message === 'no data')
            err.status = 404;
        next(err);
    }
}
const auth = async (req, res, next) => {
    try {
        const user_id = req.user;
        if (!user_id) throw new Error('인증 정보 확인에 실패하였습니다.')
        await UserModel.isExistUser(user_id);
        res.status(200).json({ 
            result: true,
            user_id,
            message: '인증에 성공했습니다.' 
        });
    } catch(err){
        if (err.message)
            err.status = 404;
        next(err);
    }
}
module.exports = {
    join,
    login,
    auth,
}