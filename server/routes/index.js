const router = require("express").Router()

router.use("/blog", require("./blog"))
router.use("/admin", require("./admin"))
router.use("/category", require("./category"))
router.use("/upload", require("./upload"))

module.exports = router