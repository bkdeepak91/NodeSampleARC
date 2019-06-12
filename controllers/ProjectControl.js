var project  = require('../repository/Project');

var projectControl = {
    createProject : (req, res) => {
        var Project = {
            name: req.body.name,
            city: req.body.city,
            createdBy: req.user.id
        };

        project.createProject(Project, (err, projectData) => {
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

                apiResult.data = projectData;
                res.json(apiResult);
            }
        });
    }
};

module.exports = projectControl;