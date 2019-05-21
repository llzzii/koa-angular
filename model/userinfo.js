const sql=require('../bin/config').sql;


const login=(username)=>{
    return `SELECT * FROM userinfo WHERE username=${username}`
}

module.exports={
    login,
}