const db = require('../db/index')
const GenId = require("../utils/ShowFlake");
const genid = new GenId({ WorkerId: 1 });
exports.Create = async (req, res) => {
  let data = req.body;
  try {
    let queryresult = await db.query("select name from tag where name=?", data.name)
    if (queryresult.length != 0) {
      throw new Error('标签已存在', 400);
    }
    data.tag_id = genid.NextId();
    let result = await db.insert("tag", data)
    if (result.affectedRows == 1) {
      res.cc('创建成功', 200)
    }
  } catch (error) {
    res.cc(error, 400)
  }
}
exports.Delete = async (req, res) => {
  let data = req.query;
  try {
    let result = await db.remove("tag", data)
    if (result.affectedRows == 1) {
      res.cc('删除成功', 200)
    }
  } catch (error) {
    res.cc(error, 400)

  }
}

exports.QueryCateAll = async (req, res) => {
  let { page, size } = req.query;
  page = Number(page)
  size = Number(size)
  let data = { page, size }
  try {
    let totalresult = await db.query("SELECT COUNT(*) as count FROM tag")
    data.total = totalresult[0].count
    let result = await db.query("select * from tag  limit ?,?;", [(page - 1) * size, size])
    if (result.length == 0) {
      res.cc('id错误', 400)
    }
    else {
      data.list = result
      res.cc('获取成功', 200, data)
    }
  } catch (error) {
    res.cc(error, 400)
  }
}

exports.QueryCateUpdate = async (req, res) => {
  try {
    let data = req.body
    let result = await db.update("tag", data, { tag_id: data.tag_id })

    if (result.length == 0) {
      res.cc('id错误', 400)
    }
    else {
      res.cc('更新成功', 200)
    }
  } catch (error) {
    res.cc(error, 400)
  }
}
