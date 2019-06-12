'use strict';
var authHandler = require('./handlers/AuthHandler');

module.exports = function (app, handlers){
    
    // //user issues
    // app.route('/user/issue/:id')
    //     .get(authHandler.isAuthenticated, handlers.userIssue.getIssue)
    //     .post(authHandler.isAuthenticated, handlers.userIssue.raiseIssue)
    //     .put(authHandler.isAuthenticated, handlers.userIssue.updateIssue)
    //     .delete(authHandler.isAuthenticated, handlers.userIssue.deleteIssue);
    // app.route('/my/pending/issues')
    //     .get(authHandler.isAuthenticated, handlers.userIssue.getPendingIssuesByUser)
    // app.route('/issue/:id')
    //     .get(authHandler.isAuthenticated, handlers.userIssue.getIssue)

}
