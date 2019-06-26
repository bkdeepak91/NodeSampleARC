var user = require('../repository/User');
var userType = require('../models/UserType');

var userControl = {
    // Gets the user token by using email
    getToken: async (req, res) => {
        var email = req.params.emailId;
        try {
            var token = await user.getTokenByEmail(email);
            var apiResult = {};
            if (token == undefined) {
                apiResult.meta = {
                    success: false,
                    error: err
                };
                apiResult.data = [];
                res.json(apiResult);
            }
            else {
                apiResult.meta = {
                    success: true,
                    rows: 1
                };
                apiResult.data = token;
                res.json(apiResult);
            }
        } catch (e) {
            //Error Handling
            logger.error('User controller caught exception: ', e);
        }
    },

    // User Creation
    addUser: async (req, res) => {
        var User = {
            name: req.body.name,
            email: req.body.email,
            type: userType[req.body.type],
            createdBy: req.user.id
        };
        var apiResult = {};

        // Checking user existence
        var existingUser = await user.getTokenByEmail(User.email);

        console.log(existingUser);

        // If User doesn't exists
        if (existingUser == undefined) {

            // Adding new user
            var insertedUser = await user.addUser(User);

            if (insertedUser == undefined) {
                apiResult.meta = {
                    success: false,
                    error: err
                };
                apiResult.data = [];
                res.json(apiResult);
            } else {
                apiResult.meta = {
                    success: true,
                    rows: 1
                };

                apiResult.data = insertedUser;
                res.json(apiResult);
            }
        }
        // If user exists 
        else {
            apiResult.meta = {
                success: false,
                error: "Existing User"
            };

            apiResult.data = [];
            res.status(401).json(apiResult);
        }
    },


    // User Updation
    updateUser: async (req, res) => {
        var User = {
            name: req.body.name,
            email: req.body.email,
            type: userType[req.body.type],
            userId: req.user.id
        };
        var apiResult = {};

        // Checking user existence
        //var existingUser = await user.getTokenByEmail(User.email);
        var updatedUser = await user.updateUser(User);
        if (updatedUser == undefined) {
            apiResult.meta = {
                success: false,
                error: err
            };

            apiResult.data = [];
            res.json(apiResult);
        } else {
            apiResult.meta = {
                success: true,
                rows: 1
            };

            apiResult.data = updatedUser;
            res.json(apiResult);
        }
    }

}

module.exports = userControl;