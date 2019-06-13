var user = require('../repository/User');
var userType = require('../models/UserType');

var authControl = {
    isAuthenticated : (req, res, next) => {
        var tokenId = req.header('userToken');

        user.getUserByToken(tokenId, (err, userDetails) => {
            var apiResult = {};
            if(err || userDetails == undefined){
                apiResult.meta = {
                    success : false,
                    error : "Unauthorized!"
                };
                apiResult.data = [];
                res.status(401).json(apiResult);
            } else {

                if(userDetails.type == userType.NO_ACCESS){
                    apiResult.meta = {
                        success : false,
                        error : "Unauthorized!"
                    };
                    apiResult.data = [];
                    res.status(401).json(apiResult);
                }
    
                if(userDetails.type == userType.READ && req.method != 'GET'){
                    apiResult.meta = {
                        success : false,
                        error : "No Write Access!"
                    };
                    apiResult.data = [];
                    res.status(401).json(apiResult);
                }
    
                req.user = {
                    id: userDetails.id,
                    type: userDetails.type
                }
    
                next();
            }

        });
    },
}

module.exports = authControl;