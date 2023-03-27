const db = require('../db/index')
const GenId = require("../utils/ShowFlake");
const genid = new GenId({ WorkerId: 1 });
const axios = require("axios")

exports.Createfirst = async (req, res) => {
  try {
    let data = req.body;
    if (data.user_id == 0 || data.content == '' || data.blog_id == '') throw new Error('缺少参数')
    data.createtime = Date.now();
    data.comment_id = genid.NextId();
    console.log(data);
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
    console.log(req.body);
    let data = req.body;
    data.createtime = Date.now();
    data.comment_id = genid.NextId();
    let result = await db.insert("comment", data)
    if (result.affectedRows == 1) {
      res.cc('评论成功', 200)
    }
    return
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
    console.log(req.query);

    let { blog_id, page, size } = req.query
    page = Number(page)
    size = Number(size)
    let result = {};
    let totalresult = await db.query("SELECT COUNT(*) as count FROM comment where blog_id=?", blog_id)
    result.total = totalresult[0].count
    let commentresult = await db.query("SELECT * FROM comment where blog_id=? and isNull(parent_id) limit ?,? ", [blog_id, (page - 1) * size, size])
    for(let item of commentresult){
      let secondcommentresult=await db.query("select * from comment where parent_id=?",item.comment_id)
      item.secondlist = secondcommentresult
    }
    result.list = commentresult
    res.cc('查询成功', 200, result)
    return

  } catch (error) {
    res.cc(error, 400)

  }
}