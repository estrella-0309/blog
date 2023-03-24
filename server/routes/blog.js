const router = require("express").Router()
const blogController=require("../controller/blog");


router.post("/_token/create",blogController.Create);
router.delete("/_token/delete", blogController.Delete);
router.get("/one", blogController.QueryBlogByid);
router.get("/all", blogController.QueryBlogAll);
router.get("/category", blogController.QueryBlogBycategory);
router.get("/tag/all", blogController.QueryBlogtagAll);
router.get("/timeline", blogController.QueryAllBlogBytime);
router.get("/view", blogController.QueryBlogByview);
router.get("/tag/num", blogController.QueryBlogTagnNums);

router.get("/tag", blogController.QueryBlogBytag);
router.put("/_token/update", blogController.update)
router.put("/_token/top", blogController.top)
router.put("/_token/top/cannel", blogController.Untop)
router.put("/_token/view", blogController.view)
router.put("/_token/view/cannel", blogController.Unview)
module.exports = router
