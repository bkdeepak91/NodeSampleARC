'use strict';
var authenticate = require('./controllers/Authorization');


module.exports = (app, controllers) => {

    // User Token Get
    app.route('/user/token/:emailId')
        .get(controllers.userControl.getToken);
    
   
    // User Creation
    app.route('/add/user/')
        .post(authenticate.isAuthenticated, controllers.userControl.addUser);
        
    app.route('/update/user/')
        .put(authenticate.isAuthenticated, controllers.userControl.updateUser);
        
    app.route('/create/project')
        .post(authenticate.isAuthenticated, controllers.projectControl.createProject);

    app.route('/create/folder')
        .post(authenticate.isAuthenticated, controllers.folderControl.createFolder);
}
