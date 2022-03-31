const mysql = require('mysql');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Mysql123@',
    port: '3306',
    database: 'proyObste',
});

connection.getConnection((err)=>{
    if(err)
    {
        console.log('Ha ocurrido un error en la conexión: '+ err);
    }else{
        console.log("connected");
    }
})

module.exports = connection;