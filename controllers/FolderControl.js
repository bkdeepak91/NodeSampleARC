var folder  = require('../repository/Folder');

var folderControl = {
    createFolder : (req, res) => {
        var Folder = {
            name: req.body.name,
            projectId: req.body.projectId,
            createdBy: 110
        };
        folder.createFolder(Folder, (err, folderData) => {
            var apiResult = {};
            if(err){
                apiResult.metaData = {
                    success : false,
                    error : err
                }; 
                apiResult.data = [];
                res.json(apiResult);
            } else {
                apiResult.metaData = {
                    success : true,
                    rows : 1
                };

                apiResult.data = folderData;
                res.json(apiResult);
            }
        });
    }
};

module.exports = folderControl;