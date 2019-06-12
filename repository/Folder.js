var db = require('./Connection');

var Folder = {
    createFolder : (folder, done) => {
        return db.query(
            "INSERT INTO pr_folders (name, project_id, created_by) values(?,?,?);",
            [folder.name,   folder.projectId, folder.createdBy],
            (error, folderData, fields) =>{
                if(error) throw error;
                done(error, folderData);
        });
    }
};

module.exports = Folder;