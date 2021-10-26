const UserModel = require('../models/userModel');
const { createToken } = require('../libs/token');

const join = async (req, res, next) => {
    try {
        const user_info = req.body;
        await UserModel.createUser(user_info);
        res.status(201).json({result : true});
    } catch(err){
        if (err.errorType == 'uniqueViolated')
            err.status = 404;
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
            user_info
        });
    } catch(err){
        if (err.message === 'no data')
            err.status = 404;
        next(err);
    }
}
const auth = async (req, res, next) => {
    try {
        const { user_id } = req.user;
        await UserModel.isExistUser(user_id);
        res.status(200).json({ user_id })
    } catch(err){
        if (err.message === 'no data')
            err.status = 404;
        next(err);
    }
}
module.exports = {
    join,
    login,
    auth,
}