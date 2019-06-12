'use strict';


module.exports = (app, controllers) => {

    // User Creation & Authentication
    app.route('/user/token/:emailId')
        .get( controllers.userControl.getToken);

    app.route('/create/project')
        .post(controllers.projectControl.createProject);

        
}
