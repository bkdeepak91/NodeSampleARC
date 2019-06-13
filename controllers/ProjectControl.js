var project = require('../repository/Project');
var userType = require('../models/UserType');

var projectControl = {
    createProject: (req, res) => {
        var Project = {
            name: req.body.name,
            city: req.body.city,
            createdBy: req.user.id
        };

        project.createProject(Project, (err, projectData) => {
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

                apiResult.data = projectData;
                res.json(apiResult);
            }
        });
    },

    updateProject: (req, res) => {
        var Project = {
            id: req.params.projectId,
            name: req.body.updatedName,
            city: req.body.updatedCity
        };

        project.updateProject(Project, (err, projectData) => {
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

                apiResult.data = projectData;
                res.json(apiResult);
            }
        });
    },

    shareProject: (req, res) => {
        var Project = {
            projectId: req.body.projectId,
            userId: req.body.userId,
            mode: req.body.mode,
            createdBy: req.user.id,
            validity: req.body.validity
        };
        project.shareProject(Project, (err, projectData) => {
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

                apiResult.data = projectData;
                res.json(apiResult);
            }
        });
    },

    // Get Project
    getProject: (req, res) => {

        var projectId = req.params.projectId;
        project.getProject(projectId, (err, projectData) => {
            var apiResult = {};

            if (err) {
                apiResult.metaData = {
                    success: false,
                    error: err
                };

                apiResult.data = [];
                res.json(apiResult);
            } else {
                project.getUsersByProject(projectId, (erruser, userData) => {
                    if (erruser) {
                        apiResult.metaData = {
                            success: false,
                            error: erruser
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
                })
            }
        });
    }
};


module.exports = projectControl;