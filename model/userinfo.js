const sql = require("../bin/config").sql;

const login = username => {
  return sql.query(`SELECT * FROM userinfo WHERE username='${username}'`);
};
const getUserList = (current, pageSize, sortName, sortValue, queryData) => {
  if (queryData !== "") {
    var total = sql.query(`SELECT COUNT(id) AS n FROM userinfo WHERE username = '${queryData}'`);
    var data = sql.query(
      `SELECT * FROM userinfo WHERE username = '${queryData}' ORDER BY ${sortName} ${sortValue} LIMIT ${pageSize *
        (current - 1)}, ${pageSize}`
    );
    return {
      total,
      data
    };
  } else {
    var total = sql.query(`SELECT COUNT(id) AS n FROM userinfo`);
    var data = sql.query(
      `SELECT * FROM userinfo  ORDER BY ${sortName} ${sortValue} LIMIT ${pageSize * (current - 1)}, ${pageSize}`
    );
    return {
      total,
      data
    };
  }
};

const createUser = userinfo => {
  return sql.query(
    `INSERT INTO userinfo SET username = '${userinfo.username}', age = ${userinfo.age},tel=${userinfo.tel},email='${
      userinfo.email
    }',address='${userinfo.address}',password='${userinfo.password}',created_time='${userinfo.created_time}',updated_time='${
      userinfo.created_time
    }'`
  );
};

const updateUser = userinfo => {
  return sql.query(
    `UPDATE userinfo SET username = '${userinfo.username}', age = ${userinfo.age},tel=${userinfo.tel},email='${
      userinfo.email
    }',address='${userinfo.address}',updated_time='${userinfo.updated_time}' WHERE id=${userinfo.id}`
  );
};
const updatePassword = userinfo => {
  return sql.query(
    `UPDATE userinfo SET password = '${userinfo.password}',updated_time='${userinfo.updated_time}' WHERE id=${userinfo.id}`
  );
};
const deleteUser = userid => {
  return sql.query(`DELETE FROM userinfo  WHERE id in (${userid})`);
};

const getRoleList = (current, pageSize, sortName, sortValue, queryData) => {
  if (queryData !== "") {
    var total = sql.query(`SELECT COUNT(id) AS n FROM role WHERE role_name = '${queryData}'`);
    var data = sql.query(
      `SELECT * FROM role WHERE role_name = '${queryData}' ORDER BY ${sortName} ${sortValue} LIMIT ${pageSize *
        (current - 1)}, ${pageSize}`
    );
    return {
      total,
      data
    };
  } else {
    var total = sql.query(`SELECT COUNT(id) AS n FROM role`);
    var data = sql.query(`SELECT * FROM role  ORDER BY ${sortName} ${sortValue} LIMIT ${pageSize * (current - 1)}, ${pageSize}`);
    return {
      total,
      data
    };
  }
};
const createRole = roleinfo => {
  return sql.query(
    `INSERT INTO role SET role_name = '${roleinfo.role_name}', number = ${roleinfo.number},is_create=${
      roleinfo.is_create
    },is_update=${roleinfo.is_update},is_delete=${roleinfo.is_delete},is_view=${roleinfo.is_view},is_action=${
      roleinfo.is_action
    },description='${userinfo.description}',created_time='${userinfo.created_time}',updated_time='${userinfo.created_time}'`
  );
};
module.exports = {
  login,
  getUserList,
  createUser,
  updateUser,
  updatePassword,
  deleteUser,
  getRoleList,
  createRole
};
