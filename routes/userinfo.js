const router = require("koa-router")();
const md5 = require("md5");
const user = require("../model/userinfo");
const info = require("../middleware/info");
const jwt = require("jsonwebtoken");

//登录
router.post("/api/login", async ctx => {
  const userinfo = ctx.request.body;
  const password = md5(md5(userinfo.password).substr(4, 7) + md5(userinfo.password));
  try {
    const data = await user.login(userinfo.username);
    if (data[0]) {
      if (data[0].password === password) {
        const token = jwt.sign(
          {
            name: data[0].username,
            _id: data[0].id
          },
          "token",
          {
            expiresIn: "0.5h"
          }
        );
        ctx.body = info.suc("登录成功", token);
      } else {
        ctx.body = info.err("账号或密码错误");
      }
    } else {
      ctx.body = info.err("用户不存在");
    }
  } catch (err) {
    ctx.body = info.err("操作失败:" + err);
  }
});

//添加用户
router.post("/api/create", async ctx => {
  const userinfo = ctx.request.body;
  const password = md5(md5("123456").substr(4, 7) + md5("123456"));
  const created_time = new Date(+new Date() + 8 * 3600 * 1000)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  userinfo["password"] = password;
  userinfo["created_time"] = created_time;
  try {
    const isHasUser = await user.login(userinfo.username);
    if (isHasUser.length == 0) {
      const data = await user.createUser(userinfo);
      if (data.affectedRows) {
        ctx.body = info.suc("添加成功");
      } else {
        ctx.body = info.err("添加失败");
      }
    } else {
      ctx.body = info.err("用户已存在");
    }
  } catch (err) {
    ctx.body = info.err("操作失败:" + err);
  }
});

//编辑用户
router.put("/api/update", async ctx => {
  const userinfo = ctx.request.body;
  const updated_time = new Date(+new Date() + 8 * 3600 * 1000)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  userinfo["updated_time"] = updated_time;
  try {
    const isHasUser = await user.login(userinfo.username);
    if (isHasUser.length == 0) {
      const data = await user.updateUser(userinfo);
      if (data.affectedRows) {
        ctx.body = info.suc("修改成功");
      } else {
        ctx.body = info.err("修改失败");
      }
    } else {
      ctx.body = info.err("用户已存在");
    }
  } catch (err) {
    ctx.body = info.err("操作失败:" + err);
  }
});
//删除用户
router.delete("/api/delete", async ctx => {
  let userid = ctx.querystring.split("=")[1];
  if (userid.endsWith(",")) {
    userid = userid.slice(0, -1);
  }
  try {
    const data = await user.deleteUser(userid);
    if (data.affectedRows) {
      ctx.body = info.suc("删除成功");
    } else {
      ctx.body = info.err("删除失败");
    }
  } catch (err) {
    ctx.body = info.err("操作失败:" + err);
  }
});

//编辑用户密码
router.put("/api/updatePassword", async ctx => {
  const userinfo = ctx.request.body;
  const password = md5(md5(userinfo.password).substr(4, 7) + md5(userinfo.password));
  const updated_time = new Date(+new Date() + 8 * 3600 * 1000)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  userinfo["updated_time"] = updated_time;
  userinfo["password"] = password;
  try {
    const data = await user.updatePassword(userinfo);
    if (data.affectedRows) {
      ctx.body = info.suc("修改成功");
    } else {
      ctx.body = info.err("修改失败");
    }
  } catch (err) {
    ctx.body = info.err("操作失败:" + err);
  }
});

//获取用户列表
router.get("/api/userlist", async ctx => {
  let params = ctx.querystring;
  let current = parseInt(info.getQuary("current", params));
  let pageSize = parseInt(info.getQuary("pageSize", params));
  let sortName = info.getQuary("sortName", params);
  let sortValue = info.getQuary("sortValue", params) === "descend" ? "DESC" : "ASC";
  let queryData = info.getQuary("queryData", params);
  try {
    const data = await user.getUserList(current, pageSize, sortName, sortValue, queryData);
    const dataList = await data.data;
    const totalRows = await data.total;
    if (data) {
      ctx.body = info.paging(dataList, totalRows);
    }
  } catch (err) {
    ctx.body = info.err("获取失败:" + err);
  }
});

/*
 * Role
 *
 */
//获取用户列表
router.get("/api/rolelist", async ctx => {
  let params = ctx.querystring;
  let current = parseInt(info.getQuary("current", params));
  let pageSize = parseInt(info.getQuary("pageSize", params));
  let sortName = info.getQuary("sortName", params);
  let sortValue = info.getQuary("sortValue", params) === "descend" ? "DESC" : "ASC";
  let queryData = info.getQuary("queryData", params);
  try {
    const data = await user.getRoleList(current, pageSize, sortName, sortValue, queryData);
    const dataList = await data.data;
    const totalRows = await data.total;
    if (data) {
      ctx.body = info.paging(dataList, totalRows);
    }
  } catch (err) {
    ctx.body = info.err("获取失败:" + err);
  }
});
//添加角色
router.post("/api/role-create", async ctx => {
  const roleinfo = ctx.request.body;
  const created_time = new Date(+new Date() + 8 * 3600 * 1000)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  roleinfo["created_time"] = created_time;
  try {
    const data = await user.createRole(roleinfo);
    if (data.affectedRows) {
      ctx.body = info.suc("添加成功");
    } else {
      ctx.body = info.err("添加失败");
    }
  } catch (err) {
    ctx.body = info.err("操作失败:" + err);
  }
});

module.exports = router;
