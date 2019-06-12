var db = require('./Connection');
var db = require('./User');

var Project = {
    updateProject : (project, done) => {
        return db.query(
            "SELECT md5(id) as token FROM ac_users User.name=?;",
            [User.name],
            "UPDATE pr_projects SET (name, city,  created_by) where md5(id)=?;",
            [token],
            (error, projectData, fields) =>{
                if(error) throw error;
                done(error, projectData);
        });
    }
};

module.exports = updateproject;