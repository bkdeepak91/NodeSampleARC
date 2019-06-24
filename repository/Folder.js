var db = require('./Connection');
var logger = require('../models/errorLogger');

var Folder = {
    createFolder: (folder, done) => {
        return db.query(
            "INSERT INTO pr_folders (name, project_id, created_by) values(?,?,?);",
            [folder.name, folder.projectId, folder.createdBy],
            (error, folderData, fields) => {
                if(error) logger.error('DB query Exception: ' , error);
                done(error, folderData);
            });
    },


    updateFolder: (folder, done) => {
        return db.query(
            "UPDATE pr_folders SET name=? WHERE id=?;",
            [folder.name, folder.id],
            (error, folderData, fields) => {
                if(error) logger.error('DB query Exception: ' , error);
                done(error, folderData);
            });
    },
    shareFolder: (folder, done) => {
        return db.query(
            "INSERT INTO pr_project_folder_share (folder_id,user_id,mode,validity,created_by) VALUES(?,?,?,?,?);",
            [folder.folderId, folder.userId, folder.mode, folder.validity, folder.createdBy],
            (error, folderData, fields) => {
                if(error) logger.error('DB query Exception: ' , error);
                done(error, folderData);



            });
    },

    fetchFolder: (projectId, done) => {
        return db.query(
            "SELECT id as folder_id, name as folder_name FROM pr_folders WHERE project_id=?;",
            [projectId],
            (error, folderData, fields) => {
                if(error) logger.error('DB query Exception: ' , error);
                done(error, folderData);
            });

    },

    getFolder: (folderId, done) => {
        return db.query(
            "SELECT id as folder_id, name as folder_name FROM pr_folders WHERE id = ?",
            [folderId],
            (error, folderData, fields) => {
                if(error) logger.error('DB query Exception: ' , error);
                done(error, folderData[0]);
            }
        );
    } ,

    getUsersByFolder: (folderId, done) => {
        return db.query(
            "select u.id, u.name, fs.mode  from ac_users u, pr_project_folder_share fs where fs.user_id=u.id AND fs.folder_id = ? ;",
            [folderId],
            (error, userData, fields) => {
                if(error) logger.error('DB query Exception: ' , error);
                done(error, userData);
            }
        );
    }
};


module.exports = Folder;