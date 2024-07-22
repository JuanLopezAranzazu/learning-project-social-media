const express = require("express");
const router = express.Router();
//controllers
const LikeController = require("../controllers/like.controller");
const likeController = new LikeController();
//middlewares
const verifyJWT = require("../middlewares/verifyJWT");
const validatorHandler = require("../middlewares/validatorHandler");
// schemas
const {
  createLikeSchema,
  updateLikeSchema,
  getLikeSchema,
} = require("../schemas/like.schema");

// routes
router.get("/all", verifyJWT, likeController.findAllLikes);
router.get("/post/:id", verifyJWT, likeController.findAllLikesByPost);
router.get(
  "/:id",
  verifyJWT,
  validatorHandler(getLikeSchema, "params"),
  likeController.findOneLike
);
router.post(
  "/",
  verifyJWT,
  validatorHandler(createLikeSchema, "body"),
  likeController.createLike
);
router.put(
  "/:id",
  verifyJWT,
  validatorHandler(getLikeSchema, "params"),
  validatorHandler(updateLikeSchema, "body"),
  likeController.updateLike
);
router.delete(
  "/:id",
  verifyJWT,
  validatorHandler(getLikeSchema, "params"),
  likeController.deleteLike
);

module.exports = router;
