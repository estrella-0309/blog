const db = require('../db/index')
const GenId = require("../utils/ShowFlake");
const genid = new GenId({ WorkerId: 1 });
const axios = require("axios")

exports.Createfirst = async (req, res) => {
  try {
    console.log(req.body);
    let data = req.body;

    if (data.user_id == 0 || data.content == '' || blog_id == '') {
      throw new Error('缺少参数')
    }
    data.createtime = Date.now();
    data.comment_id = genid.NextId();
    let result = await db.insert("comment", data)
    if (result.affectedRows == 1) {
      res.cc('评论成功', 200)
    }
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