var db = require('./Connection');
var logger = require('../models/errorLogger');

var User = {
    //User Token Get
    async getTokenByEmail(emailId) {
        try {
            var dbResult = await db.query(
                "SELECT md5(id) as token FROM ac_users WHERE email = ?;", [emailId]);
            return dbResult[0];
        } catch (e) {
            logger.error('User repository caught exception: ', e);
        }
    },

    //User Details Get
    async getUserByToken(token) {
        try {
            var dbResult = await db.query("SELECT id , type FROM ac_users WHERE md5(id) = ?;", [token]);
            return dbResult[0];
        } catch (e) {
            logger.error('User repository caught exception: ', e);
        }
    },

    // Add User
    async addUser(user) {
        try {
            var dbResult = await db.query("INSERT INTO ac_users (name, email, type, created_by) values(?,?,?,?);",
                [user.name, user.email, user.type, user.createdBy]);
            return dbResult;
        } catch (e) {
            logger.error('User repository caught exception: ', e);
        }
    },

    // Update User
    async updateUser(user) {
        try {
            var dbResult = await db.query("UPDATE ac_users SET name = ? , email = ?, type = ? WHERE id = ?;",
                [user.name, user.email, user.type, user.userId]);
            return dbResult;
        } catch (e) {
            logger.error('User repository caught exception: ', e);
        }
    }

}


module.exports = User;