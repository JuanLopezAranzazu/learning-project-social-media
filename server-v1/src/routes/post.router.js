const express = require("express");
const router = express.Router();
//controllers
const PostController = require("../controllers/post.controller");
const postController = new PostController();
//middlewares
const verifyJWT = require("../middlewares/verifyJWT");
const upload = require("../middlewares/uploadConfig");
const validatorHandler = require("../middlewares/validatorHandler");
// schemas
const {
  createPostSchema,
  updatePostSchema,
  getPostSchema,
} = require("./../schemas/post.schema");

// routes
router.get("/all", verifyJWT, postController.findAllPosts);
router.get("/user", verifyJWT, postController.findAllPostsByUser);
router.get(
  "/:id",
  verifyJWT,
  validatorHandler(getPostSchema, "params"),
  postController.findOnePost
);
router.post(
  "/",
  verifyJWT,
  upload.single("image"), // middleware para subir la imagen
  validatorHandler(createPostSchema, "body"),
  postController.createPost
);
router.put(
  "/:id",
  verifyJWT,
  upload.single("image"), // middleware para subir la imagen
  validatorHandler(getPostSchema, "params"),
  validatorHandler(updatePostSchema, "body"),
  postController.updatePost
);
router.delete(
  "/:id",
  verifyJWT,
  validatorHandler(getPostSchema, "params"),
  postController.deletePost
);

module.exports = router;
