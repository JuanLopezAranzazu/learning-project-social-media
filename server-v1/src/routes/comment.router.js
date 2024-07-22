const express = require("express");
const router = express.Router();
//controllers
const CommentController = require("../controllers/comment.controller");
const commentController = new CommentController();
//middlewares
const verifyJWT = require("../middlewares/verifyJWT");
const validatorHandler = require("../middlewares/validatorHandler");
// schemas
const {
  createCommentSchema,
  updateCommentSchema,
  getCommentSchema,
} = require("../schemas/comment.schema");

// routes
router.get("/all", verifyJWT, commentController.findAllComments);
router.get("/post/:id", verifyJWT, commentController.findAllCommentsByPost);
router.get(
  "/:id",
  verifyJWT,
  validatorHandler(getCommentSchema, "params"),
  commentController.findOneComment
);
router.post(
  "/",
  verifyJWT,
  validatorHandler(createCommentSchema, "body"),
  commentController.createComment
);
router.put(
  "/:id",
  verifyJWT,
  validatorHandler(getCommentSchema, "params"),
  validatorHandler(updateCommentSchema, "body"),
  commentController.updateComment
);
router.delete(
  "/:id",
  verifyJWT,
  validatorHandler(getCommentSchema, "params"),
  commentController.deleteComment
);

module.exports = router;
