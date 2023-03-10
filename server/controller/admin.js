const db = require('../db/index')
const {v4:uudiv4}=require("uuid");
const GenId = require("../utils/ShowFlake");
const genid = new GenId({ WorkerId: 1 });

exports.Login = async (req, res) => {
  let { id, password } = req.body;
  if (!(id && password)) {
    res.cc('缺少参数', 400)
  }

  try {
    let result = await db.query("select * from admin where admin_id= ? and password= ?", [id, password])
    console.log(result);

    if (result.length == 1) {
      let login_token=uudiv4();
      console.log(login_token);
      let tokenresult=await db.update("admin",{token:login_token},{admin_id:id})
      console.log(tokenresult);
      result[0].token=login_token
      result[0].password=null
    }
    console.log(result[0]);
    res.cc('登录成功', 200, result[0])
  } catch (error) {
    res.cc(error, 400)

  }
}