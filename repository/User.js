var db = require('./Connection');
var logger = require('../models/errorLogger');

var User = {
    getTokenByEmail : (emailId, done) => {
        return db.query(
            "SELECT md5(id) as token FROM ac_users WHERE email = ?;",
            [emailId],
            (error, token, fields) =>{
                if(error) logger.error('DB query Exception: ' , error);
                done(error, token[0]);
        });
    },

    getUserByToken : (token, done) => {
        return db.query(
            "SELECT id , type FROM ac_users WHERE md5(id) = ?;",
            [token],
            (error, user, fields) =>{
                if(error) logger.error('DB query Exception: ' , error);
                done(error, user[0]);
        });
    },

    addUser : (user, done) => {
        return db.query(
            "INSERT INTO ac_users (name, email, type, created_by) values(?,?,?,?);",
            [user.name, user.email, user.type, user.createdBy],
            (error, userCreated, fields) =>{
                if(error) logger.error('DB query Exception: ' , error);
                done(error, userCreated);
        });
    },

    updateUser : (user, done) =>{
        return db.query(
            "UPDATE ac_users SET name = ? , email = ?, type = ? WHERE id = ?;",
            [user.name, user.email, user.type, user.userId],
            (error, userupdated, fields) =>{
                if(error) logger.error('DB query Exception: ' , error);
                done(error, userupdated);
        });
    }

}


module.exports = User;