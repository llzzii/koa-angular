const mysql=require('mysql');
const comysql=require("co-mysql");

const config={
    port:3000,
    db:{
        database:'angdemo',
        user:'root',
        password:"123456",
        host:"127.0.0.1",
        port:"3306"
    }
}

const sql=comysql(mysql.createPool(config.db));

module.exports={
    config,
    sql
}