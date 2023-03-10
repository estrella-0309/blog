const router = require("express").Router()
const adminController = require("../controller/admin");
router.post("/login",adminController.Login)
module.exports=router
