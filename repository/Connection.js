var mysql = require('mysql');

var connection = mysql.createConnection({
    host: '192.168.10.67',
    port: 3306,
    user: 'ns_arc_dba',
    password: 'ns@123',
    database: 'NodeSampleARC'
});

connection.connect();

module.exports = connection;

