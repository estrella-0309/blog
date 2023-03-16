const db = require('../db/index')
const axios=require("axios")
function getQQavator(qqnumber) {
  return axios.get(`"http://q2.qlogo.cn/headimg_dl?dst_uin=${qqnumber}&spec=1"`);
}
function getQQname(qqnumber) {
  return axios.get(`"http://users.qzone.qq.com/fcg-bin/cgi_get_portrait.fcg?uins=${qqnumber}"`);
}
function getQQavtorandname(qq) {
  return Promise.all([getQQavator(qq), getQQname(qq)]).then((res)=>{
    console.log(res[0],res[1]);
  })
}
exports.Createfirst = async (req, res) => {
  try {
    let {qq}=req.body;

    // let result=await getQQavtorandname(qq);
    let result = await getQQavator(qq);
    console.log(result);
    // let result = {};
    // let blognums = await db.query("SELECT COUNT(*) as count FROM blog");
    // result.blognums = blognums[0].count;
    // let commentnum = await db.query("SELECT COUNT(*) as count FROM comment")
    // res.cc('查询成功', 200, result)
  } catch (error) {
    res.cc(error, 400)

  }
}
exports.Createscond = async (req, res) => {
  try {
    let result = {};
    let blognums = await db.query("SELECT COUNT(*) as count FROM blog");
    result.blognums = blognums[0].count;
    let commentnum = await db.query("SELECT COUNT(*) as count FROM comment")
    res.cc('查询成功', 200, result)
  } catch (error) {
    res.cc(error, 400)

  }
}
exports.banned = async (req, res) => {
  try {
    let result = {};
    let blognums = await db.query("SELECT COUNT(*) as count FROM blog");
    result.blognums = blognums[0].count;
    let commentnum = await db.query("SELECT COUNT(*) as count FROM comment")
    res.cc('查询成功', 200, result)
  } catch (error) {
    res.cc(error, 400)

  }
}
exports.QueryBlogByid = async (req, res) => {
  try {
    let result = {};
    let blognums = await db.query("SELECT COUNT(*) as count FROM blog");
    result.blognums = blognums[0].count;
    let commentnum = await db.query("SELECT COUNT(*) as count FROM comment")
    res.cc('查询成功', 200, result)
  } catch (error) {
    res.cc(error, 400)

  }
}