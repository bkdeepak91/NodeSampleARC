var db = require('./Connection');

var User = {
    getUserByToken : (token, done) => {
        return db.query(
            "SELECT id, name, email, type FROM ac_users WHERE md5(id) = ?;",
            [token],
            (error, user, fields) =>{
                if(error) throw error;
                done(user);
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