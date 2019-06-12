'use strict';
var authHandler = require('./controllers/UserControl');


module.exports = function (app, controllers){

    // User Creation & Authentication
    app.route('/user/token/:emailId')
        .get( controllers.userControl.getToken);

        
}
