const express = require("express");
const config = require("./config");
const morgan = require('morgan')
const cors = require('cors')
const db = require('./db/index')

const app = express();

app.use((req, res, next) => {
  res.cc = function (err, status = 200, data) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
      data
    })
  }
  next()
})


app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
app.use(express.static("public"))

let ADMIN_TOKEN_PATH = "/_token"
app.all("*", async (req, res, next) => {
 try {
   if (req.path.indexOf(ADMIN_TOKEN_PATH) > -1) {
     let { token } = req.headers
     if(!token) res.cc('请先登录',401)
     let result = await db.query("select * from admin where token= ?", token)

     if (result.length == 1) {
       next()
     }
     else {
       res.cc('token无效', 403)
     }
   }
   else {
     next()
   }
 } catch (error) {
    res.cc(error,400)
 }
}
)
app.use("/api", require("./routes/index"))

app.listen(config.app.port, () => {
  console.log(`"http://localhost:${config.app.port}"`);
})