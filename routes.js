'use strict';
var authenticate = require('./controllers/Authorization');
var logger = require('./models/errorLogger');

module.exports = async (app, controllers) => {
    try {
        // User Token Get
        await app.route('/user/token/:emailId')
        .get(controllers.userControl.getToken);

        
    } catch (e) {
        logger.error('Router caught exception: ' , e);
    }

}

// module.exports = (app, controllers) => {

//     // User Token Get
//     app.route('/user/token/:emailId')
//         .get(controllers.userControl.getToken);
    
//     // User Create and Update
//     app.route('/user')
//         .post(authenticate.isAuthenticated, controllers.userControl.addUser)
//         .put(authenticate.isAuthenticated, controllers.userControl.updateUser);
    
//     // Project Create
//     app.route('/project')
//         .post(authenticate.isAuthenticated, controllers.projectControl.createProject);
    
//     // Project Details get and update
//     app.route('/project/:projectId')
//         .get(authenticate.isAuthenticated, controllers.projectControl.getProject)
//         .put(authenticate.isAuthenticated, controllers.projectControl.updateProject);

//     // Project Share
//     app.route('/share/project')
//         .post(authenticate.isAuthenticated, controllers.projectControl.shareProject);

//     //create folder
//     app.route('/folder')
//         .post(authenticate.isAuthenticated, controllers.folderControl.createFolder);
    
//     //share folder
//     app.route('/share/folder')
//         .post(authenticate.isAuthenticated, controllers.folderControl.shareFolder);
    
//     //folder get
//     app.route('/folder/:folderId')
//         .get(authenticate.isAuthenticated, controllers.folderControl.getFolder)
//         .put(authenticate.isAuthenticated, controllers.folderControl.updateFolder);
    
//     //folder details
//     app.route('/project/folders/:projectId')
//         .get(authenticate.isAuthenticated, controllers.folderControl.fetchFolder);

// }
