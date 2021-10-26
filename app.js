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
    console.log(error);
    if (error.message === 'Unauthorized') error.status = 401;
    switch(error.status){
        case 401:
			res.status(401).send({error : "Unauthorized"});
            break;
        case 404:
			res.status(404).send({error : "not found"});
            break;
        default:
            res.status(500).send({error : "something wrong in server"});
    }
});
app.listen(port, () => console.log(`app listening on port ${port}`));