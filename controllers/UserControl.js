var user = require('../repository/User');
var userType = require('../models/UserType');

var userControl = {
    // Gets the user token by using email
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

    // User Creation
    addUser : (req, res) => {
        var User = {
            name : req.body.name,
            email : req.body.email,
            type : userType[req.body.type],
            createdBy : req.user.id
        };


        // Checking user existence
        user.getTokenByEmail(User.email, (err, existingUser) => {
            var apiResult = {};

            if(err){
                apiResult.meta = {
                    success : false,
                    error : err
                };
                apiResult.data = [];
                res.json(apiResult);
            } 
            
            else {
                // If user d
                if(existingUser == undefined){
                    // If the user doesn't exists then add user.
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
            
                    })

                }
                // If user exists
                else{
                    apiResult.meta = {
                        success : false,
                        error : "Existing User"
                    };
    
                    apiResult.data = [];
                    res.status(401).json(apiResult);
                }
            }

        });
    }, 

    
    // User Updation
    updateUser : (req, res) => {
        var User = {
            name : req.body.name,
            email : req.body.email,
            type : userType[req.body.type],
            userId : req.user.id
        };
        
        // Checking user existence
        user.getTokenByEmail(User.email, (err, existingUser) => {
            var apiResult = {};

            if(err){
                apiResult.meta = {
                    success : false,
                    error : err
                };
                apiResult.data = [];
                res.json(apiResult);
            } 
            
            else {
                // If the user doesn't exists then update user.
                if(existingUser == undefined){
                    
                    // User Updation
                    user.updateUser(User, (err, updatedUser) => {
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
            
                            apiResult.data = updatedUser;
                            res.json(apiResult);
                        }
                    })
                }
                // If user exists
                else{
                    apiResult.meta = {
                        success : false,
                        error : "Email Id Already Exists"
                    };
    
                    apiResult.data = [];
                    res.status(401).json(apiResult);
                }
            }

        });
    }
    
}

module.exports = userControl;
