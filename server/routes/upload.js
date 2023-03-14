const router = require("express").Router()
const multer = require("multer");
const GenId = require("../utils/ShowFlake");
const path = require('path');
const genid = new GenId({ WorkerId: 1 });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/upload')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = genid.NextId();
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })


router.post("/rich_editor_uplaod", upload.single("file"), async (req, res) => {
  try {
    res.cc('上传成功', 200, { url: `http://8.130.96.111:3030/upload/${req.file.filename}` })
  } catch (err) {
    next(err)
  }

})

module.exports = router
