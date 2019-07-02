var project = require('../repository/Project');
var logger = require('../models/errorLogger.js');


var projectControl = {

    //Create Project
    createProject: async (req, res) => {
        var Project = {
            name: req.body.name,
            city: req.body.city,
            createdBy: req.user.id
        };

        try {
            var projectData = await project.createProject(Project);

            console.log('Proj Data==>', projectData);

            var apiResult = {};
            if (projectData == undefined) {
                apiResult.metaData = {
                    success: false,
                    error: "error"
                };

                apiResult.data = [];
                res.json(apiResult);
            } else {
                apiResult.metaData = {
                    success: true,
                    rows: 1
                };
                apiResult.data = projectData;
                res.json(apiResult);
            }
        } catch (e) {
            logger.error('Project controller caught exception: ', e);
        }
    },


    // Update Project
    updateProject: async (req, res) => {
        var Project = {
            id: req.params.projectId,
            name: req.body.updatedName,
            city: req.body.updatedCity
        };

        try {

            var projectData = await project.updateProject(Project);
            var apiResult = {};
            if (projectData == undefined) {
                apiResult.metaData = {
                    success: false,
                    error: 'err'
                };

                apiResult.data = [];
                res.json(apiResult);
            } else {
                apiResult.metaData = {
                    success: true,
                    rows: 1
                };

                apiResult.data = projectData;
                res.json(apiResult);
            }
        }
        catch (e) {

            logger.error('Project controller caught exception: ', e);

        }
    },


    // Share Project
    shareProject: async (req, res) => {
        var Project = {
            projectId: req.body.projectId,
            userId: req.body.userId,
            mode: req.body.mode,
            createdBy: req.user.id,
            validity: req.body.validity
        };

        try {
            var projectData = await project.shareProject(Project);
            var apiResult = {};
            if (projectData == undefined) {
                apiResult.metaData = {
                    success: false,
                    error: 'error'
                };

                apiResult.data = [];
                res.json(apiResult);
            } else {
                apiResult.metaData = {
                    success: true,
                    rows: 1
                };

                apiResult.data = projectData;
                res.json(apiResult);
            }
        }
        catch (e) {

            logger.error('Project controller caught exception: ', e);

        }
    },

    // Get Project  
    getProject: async (req, res) => {

        var projectId = req.params.projectId;

        // Getting the project details
        try {
            var projectData = await project.getProject(projectId)
            var apiResult = {};
            if (projectData == undefined) {
                apiResult.metaData = {
                    success: false,
                    error: 'error'
                };

                apiResult.data = [];
                res.json(apiResult);
            } else {
                //Getting the user details
                var projectData = await project.getUsersByProject(projectId);
                if (projectData == undefined) {
                    apiResult.metaData = {
                        success: false,
                        error: 'erruser'
                    };
                    apiResult.data = [];
                    res.json(apiResult);
                }
                else {
                    apiResult.metaData = {
                        success: true,
                        rows: 1
                    };
                    projectData.users = userData;
                    apiResult.data = projectData;
                    res.json(apiResult);
                }

            }
        }
        catch (e) {

            logger.error('Project controller caught exception: ', e);

        }
    }
};



module.exports = projectControl;