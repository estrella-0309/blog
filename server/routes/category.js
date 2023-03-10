const router = require("express").Router()
const categoryController = require("../controller/category");


router.post("/_token/create", categoryController.Create);
router.delete("/_token/delete", categoryController.Delete);
router.get("/_token/all", categoryController.QueryCateAll);
router.put("/_token/update", categoryController.QueryCateUpdate);


module.exports = router
