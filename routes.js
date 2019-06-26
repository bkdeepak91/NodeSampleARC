'use strict';
var authenticate = require('./controllers/Authorization');
var logger = require('./models/errorLogger');

module.exports = async (app, controllers) => {
    try {
        // User Token Get
        await app.route('/user/token/:emailId')
            .get(controllers.userControl.getToken);

        // User Create and Update
        await app.route('/user')
            .post(authenticate.isAuthenticated, controllers.userControl.addUser)
            .put(authenticate.isAuthenticated, controllers.userControl.updateUser);

        // Project Create
        await app.route('/project')
            .post(authenticate.isAuthenticated, controllers.projectControl.createProject);

        // Project Details get and update
        await app.route('/project/:projectId')
            .get(authenticate.isAuthenticated, controllers.projectControl.getProject)
            .put(authenticate.isAuthenticated, controllers.projectControl.updateProject);

        // Project Share
        await app.route('/share/project')
            .post(authenticate.isAuthenticated, controllers.projectControl.shareProject);

        //create folder
        await app.route('/folder')
            .post(authenticate.isAuthenticated, controllers.folderControl.createFolder);

        //share folder
        await app.route('/share/folder')
            .post(authenticate.isAuthenticated, controllers.folderControl.shareFolder);

        //folder get
        await app.route('/folder/:folderId')
            .get(authenticate.isAuthenticated, controllers.folderControl.getFolder)
            .put(authenticate.isAuthenticated, controllers.folderControl.updateFolder);

        //folder details
        await app.route('/project/folders/:projectId')
            .get(authenticate.isAuthenticated, controllers.folderControl.fetchFolder);

    } catch (err) {
        logger.error('Router caught exception: ', err);
    }
}
