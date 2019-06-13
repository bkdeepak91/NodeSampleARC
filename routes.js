'use strict';
var authenticate = require('./controllers/Authorization');


module.exports = (app, controllers) => {

    // User Token Get
    app.route('/user/token/:emailId')
        .get(controllers.userControl.getToken);
    
   
    // User Creation
    app.route('/add/user/')
        .post(authenticate.isAuthenticated, controllers.userControl.addUser);

    app.route('/create/project')
        .post(authenticate.isAuthenticated, controllers.projectControl.createProject);

    app.route('/create/folder')
        .post(authenticate.isAuthenticated, controllers.folderControl.createFolder);

    app.route('/share/folder')
        .post(authenticate.isAuthenticated, controllers.folderControl.shareFolder);

    app.route('/folder/:folderId')
        .get(authenticate.isAuthenticated, controllers.folderControl.getFolder);

    app.route('/update/folder/:folderId')
        .put(authenticate.isAuthenticated, controllers.folderControl.updateFolder);

    app.route('/project/folders/:projectId')
        .get(authenticate.isAuthenticated, controllers.folderControl.fetchFolder);


}
