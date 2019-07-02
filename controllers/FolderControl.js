var folder = require('../repository/Folder');
var logger = require('../models/errorLogger');

var folderControl = {
    createFolder: async (req, res) => {
        var Folder = {
            name: req.body.name,
            projectId: req.body.projectId,
            createdBy: req.user.id

        };


        var apiResult = {};
    try{
        var createdFolder = await folder.createFolder(Folder);


        if (createdFolder == undefined) {
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

            apiResult.data = createdFolder;
            res.json(apiResult);
        }
      }catch(e){
          logger.error('folder control caught exception:',e);
      }

    },

    updateFolder: async (req, res) => {
        var UpdateFolder = {
            name: req.body.name,
            id: req.params.folderId

        };
        var apiResult = {};
    try{
        var updatedFolder = await folder.updateFolder(UpdateFolder);
        if (updatedFolder == undefined) {
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
            apiResult.data = updatedFolder;
            res.json(apiResult);
        }
        }catch(e){
            logger.error('folder control caught exception:',e);   
        } 


    },

    shareFolder: async (req, res) => {
        var shareFolderObj = {
            userId: req.body.userId,
            folderId: req.body.folderId,
            mode: req.body.mode,
            createdBy: req.user.id,
            validity: req.body.validity
        };

        var apiResult = {};
    try{
        var sharedFolder = await folder.shareFolder(shareFolderObj);
         
        if (sharedFolder == undefined) {
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

            apiResult.data = sharedFolder;
            res.json(apiResult);
        }
      } catch(e) { 
        logger.error('folder control caught exception:',e);
      }


    },

    fetchFolder: async (req, res) => {
        var projectId = req.params.projectId;

        var apiResult = {};
    try{
        var fetchedFolder = await folder.fetchFolder(projectId);
        if (fetchedFolder == undefined) {
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

            apiResult.data = fetchedFolder;
            res.json(apiResult);
        }
       }catch(e) {
        logger.error('folder control caught exception:',e);
       }

    },

    getFolder: async (req, res) => {
        var folderId = req.params.folderId;


        var apiResult = {};
        try{
            var gotFolder = await folder.getFolder(folderId);
            if (gotFolder == undefined) {
                apiResult.metaData = {
                    success: false,
                    error: err
                };
                apiResult.data = [];
                res.json(apiResult);
            } else {
                 var folderUserDetails  = await folder.getUsersByFolder(folderId);
                 try{
                    if (folderUserDetails == undefined) {
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
                        gotFolder.users = folderUserDetails;
                        apiResult.data = gotFolder;
                        res.json(apiResult);
                    }
                } catch(e){
                    logger.error('folder control caught exception:',e);
                }
    
                
            }
        }catch(e) {
            logger.error('folder control caught exception:',e);
        }

    }
};


module.exports = folderControl;