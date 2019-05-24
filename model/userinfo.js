const sql=require('../bin/config').sql;


const login=(username)=>{
    return sql.query(`SELECT * FROM userinfo WHERE username=${username}`);
}

module.exports={
    login,
    
}