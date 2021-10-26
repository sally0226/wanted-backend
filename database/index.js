const Datastore = require('nedb');

const db = {};
db.users = new Datastore({filename: './database/users.db'});
db.posts = new Datastore({filename: './database/posts.db'});

db.users.ensureIndex({fieldName: 'user_id', unique: true});
db.posts.ensureIndex({fieldName: 'updateAt', sparse: true});

module.exports = db;