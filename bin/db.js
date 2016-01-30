var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'eu-cdbr-azure-north-d.cloudapp.net',
  user     : 'b957ca83399f7a',
  database : 'node'
  password : '000fed76'
});

module.exports = connection;