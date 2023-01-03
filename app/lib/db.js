const mysql = require("mysql");
var mySqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Uzi2115',
    database: 'bank',
    port: 3308,
    multipleStatements: true
})

mySqlConnection.connect(function(error){
    if(!!error){
        console.log(error);
    }else{
        console.log('Connected!:)');
    }
});
module.exports = mySqlConnection;
