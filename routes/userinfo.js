const router = require("koa-router")();
const md5 = require("md5");
const user = require("../model/userinfo");
const info = require("../middleware/info");

router.post("/api/login", async (ctx) => {
  const userinfo = ctx.request.body;
  const password = md5(md5(userinfo.password).substr(4, 7) + md5(userinfo.password));
  try {
    const data = await user.login(userinfo.username);
    if (data[0]) {
      if (data[0].password === password) {
        ctx.body = info.suc("登录成功");
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

module.exports = router;
