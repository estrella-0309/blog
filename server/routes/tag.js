const router = require("express").Router()
const TagController = require("../controller/tag");


router.post("/_token/create", TagController.Create);
router.delete("/_token/delete", TagController.Delete);
router.get("/all", TagController.QueryCateAll);
router.put("/_token/update", TagController.QueryCateUpdate);


module.exports = router
