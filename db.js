const SQL_info = require('./SQL_info.json')
const mysql = require('mysql');
var connection;

const conn = {
	host: SQL_info.host,
	port: SQL_info.port,
	user: SQL_info.user,
	password: SQL_info.password,
	database: SQL_info.database
};

function connect(){
    connection = mysql.createConnection(conn);  // DB Connect
    connection.connect(function(err){
        if(err){
            console.error(err);
            console.error("MySQL connection err");
            return ;
        }
        console.log("MySQL connected");
    });

    return connection;
}

function return_connection(){
    return connection;
}

module.exports = {
    connect,
    return_connection
}