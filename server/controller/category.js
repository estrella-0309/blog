const db = require('../db/index')
const GenId = require("../utils/ShowFlake");
const genid = new GenId({ WorkerId: 1 });
exports.Create = async (req, res) => {
  let data = req.body;
  data.category_id = genid.NextId();
  try {
    let result = await db.insert("category", data)
    if (result.affectedRows == 1) {
      res.cc('创建成功', 200)
    }
  } catch (error) {
    res.cc(error, 400)

  }
}
exports.Delete = async (req, res) => {
  let data = req.body;
  try {
    let result = await db.remove("category", data)
    if (result.affectedRows == 1) {
      res.cc('删除成功', 200)
    }
  } catch (error) {
    res.cc(error, 400)

  }
}

exports.QueryCateAll = async (req, res) => {
  try {
    let result = await db.query("select * from category ",)
    if (result.length == 0) {
      res.cc('id错误', 400)
    }
    else {
      res.cc(result, 200)
    }
  } catch (error) {
    res.cc(error, 400)
  }
}

exports.QueryCateUpdate = async (req, res) => {
  try {
    let data = req.body
    let result = await db.update("category", data, { Blogid: data.Blogid })

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
