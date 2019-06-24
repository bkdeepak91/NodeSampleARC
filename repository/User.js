var db = require('./Connection');
var logger = require('../models/errorLogger');

var User = {
    getTokenByEmail : (emailId, done) => {
        try{
            return new Promise ((resolve, reject)=>(db.query(
                "SELECT md5(id) as token FROM ac_users WHERE email = ?;",
                [emailId],
                (error, token, fields) =>{
                    if(error) logger.error('DB query Exception: ' , error);
                    resolve(done(error, token[0]));
            })))
        }catch (e){
            logger.error('User repository caught exception: ' , e);
        }
    }
}


module.exports = User;