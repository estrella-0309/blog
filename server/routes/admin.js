const router = require("express").Router()
const adminController = require("../controller/admin");
router.post("/login",adminController.Login)
router.get("/_token/dashboard", adminController.dashboard)
module.exports=router
