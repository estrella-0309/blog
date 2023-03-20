const db = require('../db/index')
const GenId = require("../utils/ShowFlake");
const genid = new GenId({ WorkerId: 1 });

exports.Create = async (req, res) => {
  let data = req.body;
  data.blog_id = genid.NextId();
  data.createtime = Date.now();
  data.status = "1";
  try {
    let result = await db.insert("blog", data)
    if (result.affectedRows == 1) {
      res.cc('创建成功', 200)
    }
  } catch (error) {
    res.cc(error, 400)

  }
}
exports.Delete = async (req, res) => {
  let { blog_id } = req.body;
  try {
    let result = await db.remove("blog", { blog_id })
    if (result.affectedRows == 1) {
      res.cc('删除成功', 200)
    }
  } catch (error) {
    res.cc(error, 400)

  }
}

exports.QueryBlogByid = async (req, res) => {
  let { blog_id } = req.body;
  try {
    let result = await db.query("select * from blog where blog_id= ?", blog_id)
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
exports.QueryAllBlogBytime = async (req, res) => {
  try {
    let result = await db.query("select * from blog where status = 1 ;")
    result.sort((a, b) => parseInt(b.createtime) - parseInt(a.createtime));
    const blogByMonth = {};
    result.forEach(blog => {
      const date = new Date(parseInt(blog.createtime));
      const year = date.getFullYear();
      const month = date.getMonth() + 1; 

      if (!blogByMonth[year]) {
        blogByMonth[year] = {};
      }
      if (!blogByMonth[year][month]) {
        blogByMonth[year][month] = [];
      }
      blogByMonth[year][month].push(blog);
    });
    if (result.length == 0) {
      res.cc('id错误', 400)
    }
    else {
      res.cc(blogByMonth, 200)
    }
  } catch (error) {
    res.cc(error, 400)
  }
}


exports.QueryBlogAll = async (req, res) => {
 
  let { page, size } = req.body;
  let total=0;
  let data={page,size};
  try {
    let totalresult = await db.query("SELECT COUNT(*) as count FROM blog")
    console.log(totalresult);
    
    let result = await db.query("select * from blog where status = 1 limit ?,?;", [(page - 1) * size, size])
    if (result.length == 0) {
      res.cc('没有数据', 400)
    }
    else {
      res.cc(result, 200)
    }
  } catch (error) {
    res.cc(error, 400)
  }
}

exports.QueryBlogBycategory = async (req, res) => {
  let { page, size, category_id } = req.body;
  try {
    let result = await db.query("select * from blog where status = 1 and category_id=? limit ?,?;", [category_id, (page - 1) * size, size])
    if (result.length == 0) {
      res.cc('没有数据', 400)
    }
    else {
      res.cc(result, 200)
    }
  } catch (error) {
    res.cc(error, 400)
  }
}

exports.QueryBlogtagAll = async (req, res) => {
  try {
    let result = await db.query("select tag from blog")
    if (result.length == 0) {
      res.cc('没有数据', 400)
    }
    else {
      let array = [];
      for (let i of result) {
        array.push(i.tag)
      }
      res.cc(array, 200)
    }
  } catch (error) {
    res.cc(error, 400)
  }
}

exports.QueryBlogBytag = async (req, res) => {
  try {
    let { page, size, tag } = req.body;
    tag = '%' + tag + '%'

    let result = await db.query("select * from blog where status = 1 and tag like ? limit ?,?;", [tag, (page - 1) * size, size])

    if (result.length == 0) {
      res.cc('没有数据', 400)
    }
    else {
      res.cc(result, 200)
    }
  } catch (error) {
    res.cc(error, 400)
  }
}

exports.update = async (req, res) => {
  try {
    let data = req.body

    let result = await db.update("blog", data, { blog_id: data.blog_id })

    if (result.affectedRows == 0) {
      res.cc('id错误', 400)
    }
    else {
      let queryresult = await db.query("select * from blog where blog_id= ?", data.blog_id)

      res.cc('修改成功', 200, queryresult)
    }
  } catch (error) {
    res.cc(error, 400)
  }
}

exports.top = async (req, res) => {
  try {
    let data = req.body

    let result = await db.update("blog", {istop:1}, { blog_id: data.blog_id })

    if (result.affectedRows == 0) {
      res.cc('id错误', 400)
    }
    else {
      res.cc('置顶成功', 200)
    }
  } catch (error) {
    res.cc(error, 400)
  }
}

exports.Untop = async (req, res) => {
  try {
    let data = req.body

    let result = await db.update("blog", { istop: 0}, { blog_id: data.blog_id })

    if (result.affectedRows == 0) {
      res.cc('id错误', 400)
    }
    else {
      res.cc('取消置顶成功', 200)
    }
  } catch (error) {
    res.cc(error, 400)
  }
}
