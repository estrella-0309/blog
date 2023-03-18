const db = require('../db/index')
const {v4:uudiv4}=require("uuid");
exports.Login = async (req, res) => {
  let { username, password } = req.body;
  if (!(username && password)) {
    res.cc('缺少参数', 400)
  }
  try {
    let result = await db.query("select * from admin where admin_name= ? and password= ?", [username, password])
    if (JSON.stringify(result) == '[]') throw new Error('用户名或密码错误')
    if (result.length == 1) {
      let login_token=uudiv4();
      let tokenresult = await db.update("admin", { token: login_token }, { admin_id: result[0].admin_id })
      if (tokenresult.affectedRows !== 1) throw new Error(tokenresult.info)
      result[0].token = login_token
      result[0].password=null
    }
    res.cc('登录成功', 200, result[0])
    return
  } catch (error) {
    res.cc(error, 400)

  }
}

exports.dashboard = async (req, res) => {
  try {
    let result={};
    let blognums = await db.query("SELECT COUNT(*) as count FROM blog");
    result.blognums = blognums[0].count;
    let commentnum = await db.query("SELECT COUNT(*) as count FROM comment")
    res.cc('查询成功', 200, result)
  } catch (error) {
    res.cc(error, 400)

  }
}