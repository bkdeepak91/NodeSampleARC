var db = require('./Connection');

var Project = {
    createProject : (project, done) => {
        return db.query(
            "INSERT INTO pr_projects  (name, city,  created_by) values(?,?,?);",
            [project.name, project.city,  project.createdBy],
            (error, projectData, fields) =>{
                if(error) throw error;
                done(error, projectData);
        });
    }
};

module.exports = Project;