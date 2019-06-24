var db = require('./Connection');
var logger = require('../models/errorLogger');

var Project = {
    createProject: (project, done) => {
        return db.query(
            "INSERT INTO pr_projects (name, city,  created_by) values(?,?,?);",
            [project.name, project.city, project.createdBy],
            (error, projectData, fields) => {
                if(error) logger.error('DB query Exception: ' , error);
                done(error, projectData);
            });
    },

    updateProject: (project, done) => {
        return db.query(
            "UPDATE pr_projects SET name = ? , city = ? where id=?;",
            [project.name, project.city, project.id],
            (error, projectData, fields) => {
                if(error) logger.error('DB query Exception: ' , error);
                done(error, projectData);
            });
    },

    shareProject: (project, done) => {
        return db.query(
            "INSERT INTO pr_project_user (project_id, user_id, mode,created_by,validity)values(?,?,?,?,?);",
            [project.projectId, project.userId, project.mode, project.createdBy, project.validity],
            (error, projectData, fields) => {
                if(error) logger.error('DB query Exception: ' , error);
                done(error, projectData);
            });

    },

    getProject: (projectId, done) => {
        return db.query(
            "select id as project_id, name, city, created_by from pr_projects WHERE id = ?;",
            [projectId],
            (error, projectData, fields) => {
                if(error) logger.error('DB query Exception: ' , error);
                done(error, projectData[0]);
            });
    },

    getUsersByProject: (projectId, done) => {
        return db.query(
            "select u.id as userId, u.name as userName, u.email as userEmail, u.type as accessType from pr_project_user pu, ac_users u WHERE pu.user_id = u.id and pu.project_id = ?;",
            [projectId],
            (error, userData, fields) => {
                if(error) logger.error('DB query Exception: ' , error);
                done(error, userData);
            });
    }
};

module.exports = Project;