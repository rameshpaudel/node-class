var mysql = require("mysql");
// Configuration for connecting with the mysql driver
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "test"
});
//Connecting to the db
connection.connect();

module.exports = connection