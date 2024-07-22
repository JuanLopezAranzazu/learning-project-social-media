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
// api para obtener todas las publicaciones
router.get("/all", verifyJWT, postController.findAllPosts);
// api para obtener todas las publicaciones de un publicacion
router.get("/user", verifyJWT, postController.findAllPostsByUser);
// api para obtener un usuario por id
router.get(
  "/:id",
  verifyJWT,
  validatorHandler(getPostSchema, "params"),
  postController.findOnePost
);
// api para crear una publicacion
router.post(
  "/",
  verifyJWT,
  upload.single("image"), // middleware para subir la imagen
  validatorHandler(createPostSchema, "body"),
  postController.createPost
);
// api para actualizar una publicacion
router.put(
  "/:id",
  verifyJWT,
  upload.single("image"), // middleware para subir la imagen
  validatorHandler(getPostSchema, "params"),
  validatorHandler(updatePostSchema, "body"),
  postController.updatePost
);
// api para eliminar una publicacion
router.delete(
  "/:id",
  verifyJWT,
  validatorHandler(getPostSchema, "params"),
  postController.deletePost
);

module.exports = router;
