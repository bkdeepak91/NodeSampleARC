'use strict';
var authenticate = require('./controllers/Authorization');


module.exports = (app, controllers) => {

    // User Token Get
    app.route('/user/token/:emailId')
        .get(controllers.userControl.getToken);
    
   
    // User Creation
    app.route('/add/user')
        .post(authenticate.isAuthenticated, controllers.userControl.addUser);
    
    // User Updation
    app.route('/update/user/')
        .put(authenticate.isAuthenticated, controllers.userControl.updateUser);
    
    // Project Creation
    app.route('/create/project')
        .post(authenticate.isAuthenticated, controllers.projectControl.createProject);
    
    // Project Details get and updation
    app.route('/project/:projectId')
        .get(authenticate.isAuthenticated, controllers.projectControl.getProject)
        .put(authenticate.isAuthenticated, controllers.projectControl.updateProject);

    app.route('/share/project')
        .post(authenticate.isAuthenticated, controllers.projectControl.shareProject);

    app.route('/create/folder')
        .post(authenticate.isAuthenticated, controllers.folderControl.createFolder);
    
}