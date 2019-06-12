var db = require('./Connection');


var User = {
    getTokenByEmail : (emailId, done) => {
        return db.query(
            "SELECT md5(id) as token FROM ac_users WHERE email = ?;",
            [emailId],
            (error, token, fields) =>{
                if(error) throw error;
                done(error, token[0]);
        });
    },

    getUserByToken : (token, done) => {
        return db.query(
            "SELECT id, name, email, type FROM ac_users WHERE md5(id) = ?;",
            [token],
            (error, user, fields) =>{
                if(error) throw error;
                done(error, user);
        });
    },

    addUser : (user, done) => {
        return db.query(
            "INSERT INTO ac_users (name, email, type, created_by) values(?,?,?,?);",
            [user.name, user.email, user.type, user.createdBy],
            (error, user, fields) =>{
                if(error) throw error;
                done(user);
        });
    }
}


module.exports = User;