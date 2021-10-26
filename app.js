const express = require('express');
const cookieParser = require('cookie-parser');
const { jwtMiddleware } = require('./libs/token');
const cors = require('cors');
const router = require('./router/router');
const db = require('./database');
const app = express();
const port = 5000;

require('dotenv').config();

db.users.loadDatabase();
db.posts.loadDatabase();

app.use(cors({credentials: true}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(jwtMiddleware);
app.use('/',router);
app.use((error, req, res, next)=> {
    if (error.message === 'Unauthorized') error.status = 401;
    else if (error.message === 'Forbidden') error.status = 403;
    console.log(error.message);
    switch(error.status){
        case 401:
            if(!error.message) error.message = 'Unauthorized';
            break;
        case 403:
            if(!error.message) error.message = 'Forbidden';
            break;
        case 404:
            if(!error.message) error.message = 'not found';
            break;
        default:
            error.status = 500;
            error.message = '서버에서 문제가 발생했습니다.';
    }
    res.status(error.status).send({message: error.message});
});
app.listen(port, () => console.log(`app listening on port ${port}`));