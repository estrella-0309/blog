const router = require("express").Router()
const CommentController = require("../controller/comment");

router.post("/create/first", CommentController.Createfirst);
router.post("/create/second", CommentController.Createscond);
router.delete("/banned", CommentController.banned);
router.get("/", CommentController.QueryBlogByid);
module.exports = router
