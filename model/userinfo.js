const sql = require('../bin/config').sql;


const login = (username) => {
  return sql.query(`SELECT * FROM userinfo WHERE username='${username}'`);
}
const getUserList = () => {
  return sql.query(`SELECT * FROM userinfo`);
}
const createUser = (userinfo) => {
  return sql.query(`INSERT INTO userinfo SET username = '${userinfo.username}', age = ${userinfo.age},tel=${userinfo.tel},email='${userinfo.email}',address='${userinfo.address}',password='${userinfo.password}',created_time='${userinfo.created_time}',updated_time='${userinfo.created_time}'`);
}

const updateUser = (userinfo) => {
  return sql.query(`UPDATE userinfo SET username = '${userinfo.username}', age = ${userinfo.age},tel=${userinfo.tel},email='${userinfo.email}',address='${userinfo.address}',updated_time='${userinfo.updated_time}' WHERE id=${userinfo.id}`);

}
const updatePassword = (userinfo) => {
  return sql.query(`UPDATE userinfo SET password = '${userinfo.password}',updated_time='${userinfo.updated_time}' WHERE id=${userinfo.id}`);
}
const deleteUser = (userid) => {
  return sql.query(`DELETE FROM userinfo  WHERE id in (${userid})`);
}

module.exports = {
  login,
  getUserList,
  createUser,
  updateUser,
  updatePassword,
  deleteUser

}
