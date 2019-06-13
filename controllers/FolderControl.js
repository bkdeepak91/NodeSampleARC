var folder = require('../repository/Folder');

var folderControl = {
    createFolder: (req, res) => {
        var Folder = {
            name: req.body.name,
            projectId: req.body.projectId,
            createdBy: req.user.id

        };
        folder.createFolder(Folder, (err, folderData) => {
            var apiResult = {};
            if (err) {
                apiResult.metaData = {
                    success: false,
                    error: err
                };
                apiResult.data = [];
                res.json(apiResult);
            } else {
                apiResult.metaData = {
                    success: true,
                    rows: 1
                };

                apiResult.data = folderData;
                res.json(apiResult);
            }
        });
    },

    updateFolder: (req, res) => {
        var UpdateFolder = {
            name: req.body.name,
            id: req.params.folderId

        };
        folder.updateFolder(UpdateFolder, (err, folderData) => {
            var apiResult = {};
            if (err) {
                apiResult.metaData = {
                    success: false,
                    error: err
                };
                apiResult.data = [];
                res.json(apiResult);
            } else {
                apiResult.metaData = {
                    success: true,
                    rows: 1
                };
                apiResult.data = folderData;
                res.json(apiResult);
            }
        });

    },

    shareFolder: (req, res) => {
        var ShareFolder = {
            userId: req.body.userId,
            folderId: req.body.folderId,
            mode: req.body.mode,
            createdBy: req.user.id,
            validity: req.body.validity
        };



        folder.shareFolder(ShareFolder, (err, folderData) => {
            var apiResult = {};
            if (err) {
                apiResult.metaData = {
                    success: false,
                    error: err
                };
                apiResult.data = [];
                res.json(apiResult);
            } else {
                apiResult.metaData = {
                    success: true,
                    rows: 1
                };

                apiResult.data = folderData;
                res.json(apiResult);
            }
        });

    },

    fetchFolder: (req, res) => {
        var projectId = req.params.projectId;
        

        folder.fetchFolder(projectId, (err, folderData) => {
            var apiResult = {};
            if (err) {
                apiResult.metaData = {
                    success: false,
                    error: err
                };
                apiResult.data = [];
                res.json(apiResult);
            } else {
                apiResult.metaData = {
                    success: true,
                    rows: 1
                };

                apiResult.data = folderData;
                res.json(apiResult);
            }
        });
    },

    getFolder : (req, res) => {
        var folderId = req.params.folderId;

        folder.getFolder(folderId, (err, folderData) => {
            var apiResult = {};
            if (err) {
                apiResult.metaData = {
                    success: false,
                    error: err
                };
                apiResult.data = [];
                res.json(apiResult);
            } else {
                folder.getUsersByFolder(folderId, (userErr, userData) => {
                    if(userErr){
                        apiResult.metaData = {
                            success: false,
                            error: err
                        };
                        apiResult.data = [];
                        res.json(apiResult);
                    } else {
                        apiResult.metaData = {
                            success: true,
                            rows: 1
                        };
                        folderData.users = userData;
                        apiResult.data = folderData;
                        res.json(apiResult);
                    }

                });
            }
        });
    }
};


module.exports = folderControl;