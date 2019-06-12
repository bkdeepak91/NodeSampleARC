var user = require('../repository/User');
var userType = require('../models/UserType');

var userControl = {
    getToken : (req, res) => {
        var email = req.params.emailId;

        user.getTokenByEmail(email, (err, token) => {
            var apiResult = {};

            if(err){
                apiResult.meta = {
                    success : false,
                    error : err
                };

                apiResult.data = [];
                res.json(apiResult);
            } else {
                apiResult.meta = {
                    success : true,
                    rows : 1
                };

                apiResult.data = token;
                res.json(apiResult);
            }
        });
    },  


    addUser : (req, res) => {
        var User = {
            name : req.body.name,
            email : req.body.email,
            type : userType[req.body.type],
            createdBy : req.user.id
        };

        user.addUser(User, (err, insertedUser) => {
            var apiResult = {};
            if(err){
                apiResult.meta = {
                    success : false,
                    error : err
                };

                apiResult.data = [];
                res.json(apiResult);
            } else {
                apiResult.meta = {
                    success : true,
                    rows : 1
                };

                apiResult.data = insertedUser;
                res.json(apiResult);
            }

        });
    }
}

module.exports = userControl;
