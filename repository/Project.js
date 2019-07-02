var db = require('./Connection');
var logger = require('../models/errorLogger.js');


var Project = {
    async createProject(project) {
        try {
            projectData = await db.query(
                "INSERT INTO pr_projects (name, city,  created_by) values(?,?,?);",
                [project.name, project.city, project.createdBy]);
            return projectData;
        } catch (e) {
            logger.error('Project repository caught exception:', e);
        }
    },

    async updateProject(project) {
        try {
            projectData = await db.query(
                "UPDATE pr_projects SET name = ? , city = ? where id=?;",
                [project.name, project.city, project.id]);
            return projectData[0];
        } catch (e) {
            logger.error('Project repository caught exception:', e);
        }
    },

    async shareProject(project) {
        try {
            projectData = await db.query(
                "INSERT INTO pr_project_user (project_id, user_id, mode,created_by,validity)values(?,?,?,?,?);",
                [project.projectId, project.userId, project.mode, project.createdBy, project.validity]);
            return projectData;
        } catch (e) {
            logger.error('Project repository caught exception:', e);
        }

    },

    async getProject(projectId) {
        try {
            projectData = await db.query(
                "select id as project_id, name, city, created_by from pr_projects WHERE id = ?;",
                [projectId]);
            return projectData[0];
        } catch (e) {
            logger.error('Project repository caught exception:', e);
        }

    },

    async getUsersByProject(projectId) {
        try {
            userData = await db.query(
                "select u.id as userId, u.name as userName, u.email as userEmail, u.type as accessType from pr_project_user pu, ac_users u WHERE pu.user_id = u.id and pu.project_id = ?;",
                [projectId]);
            return userData;
        } catch (e) {
            logger.error('Project repository caught exception:', e);
        }

    }
};

module.exports = Project;