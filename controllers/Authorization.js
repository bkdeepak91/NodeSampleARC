var user = require('../repository/User');
var userType = require('../models/UserType');

var authControl = {
    isAuthenticated: async (req, res, next) => {
        var tokenId = req.header('userToken');
        try {
            var userDetails = await user.getUserByToken(tokenId);
            var apiResult = {};
            // If token is invalid
            if (userDetails == undefined) {
                apiResult.meta = {
                    success: false,
                    error: "Unauthorized!"
                };
                apiResult.data = [];
                res.status(401).json(apiResult);
            }
            // If token is valid and
            else {
                // No Access
                if (userDetails.type == userType.NO_ACCESS) {
                    apiResult.meta = {
                        success: false,
                        error: "Unauthorized!"
                    };
                    apiResult.data = [];
                    res.status(401).json(apiResult);
                }
                // No write access
                if (userDetails.type == userType.READ && req.method != 'GET') {
                    apiResult.meta = {
                        success: false,
                        error: "No Write Access!"
                    };
                    apiResult.data = [];
                    res.status(401).json(apiResult);
                }
                // Athourized person
                req.user = {
                    id: userDetails.id,
                    type: userDetails.type
                }
                next();
            }
        } catch (e) {
            //Error Handling
            logger.error('Authorization controller caught exception: ', e);
        }
    },
}

module.exports = authControl;