var db = require('./Connection');
var logger = require('../models/errorLogger');

var Folder = {
     createFolder: async (folder) => {
        try {
            var dbResult = await db.query(
                "INSERT INTO pr_folders (name, project_id, created_by) values(?,?,?);",
                [folder.name, folder.projectId, folder.createdBy]);
            // console.log(dbResult);
            return dbResult;
        } catch (e) {
            logger.error('Folder repository caught exception:', e);
        }
    },

     updateFolder: async (folder) => {
        try {
            var dbResult = await db.query(
                "UPDATE pr_folders SET name=? WHERE id=?;",
                [folder.name, folder.id]);
            return dbResult;
        } catch (e) {
            logger.error('Folder repository caught exception:', e);
        }
    },

     shareFolder: async (folder) => {
        try {
            var dbResult = await db.query(
                "INSERT INTO pr_project_folder_share (folder_id,user_id,mode,validity,created_by) VALUES(?,?,?,?,?);",
                [folder.folderId, folder.userId, folder.mode, folder.validity, folder.createdBy]);
                  
            return dbResult;
        } catch (e) {
            logger.error('Folder repository caught exception:',e);
        }
    },

     fetchFolder: async (projectId) => {
        try {
            var dbResult = await db.query(
                "SELECT id as folder_id, name as folder_name FROM pr_folders WHERE project_id=?;",
                [projectId]);
            return dbResult;
        } catch (e) {
            logger.error('Folder repository caught exception:', e);
        }
    },

     getFolder: async (folderId) => {
        try {
            var dbResult = await db.query(
                "SELECT id as folder_id, name as folder_name FROM pr_folders WHERE id = ?",
                [folderId]);
            return dbResult;
        } catch (e) {
            logger.error('Folder repository caught exception:', e);
        }
    },

     getUsersByFolder: async (folderId) => {
        try {
            var dbResult = await db.query(
                "select u.id, u.name, fs.mode  from ac_users u, pr_project_folder_share fs where fs.user_id=u.id AND fs.folder_id = ? ;",
                [folderId]);
            return dbResult;
        } catch (e) {
            logger.error('Folder repository caught exception:',e);
        }

    }
};

module.exports = Folder;