const express = require("express");
const router = express.Router();
//controllers
const UserController = require("../controllers/user.controller");
const userController = new UserController();
//middlewares
const verifyJWT = require("../middlewares/verifyJWT");
const upload = require("../middlewares/uploadConfig");
const admin = require("../middlewares/checkRoles");
const validatorHandler = require("../middlewares/validatorHandler");
// schemas
const {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
} = require("../schemas/user.schema");

// routes
// api para obtener todos los usuarios
router.get("/all", verifyJWT, admin, userController.findAllUsers);
// api para obtener un usuario por id
router.get(
  "/:id",
  verifyJWT,
  admin,
  validatorHandler(getUserSchema, "params"),
  userController.findOneUser
);
// api para crear un usuario
router.post(
  "/",
  verifyJWT,
  admin,
  upload.single("image"), // middleware para subir la imagen
  validatorHandler(createUserSchema, "body"),
  userController.createUser
);
// api para actualizar un usuario
router.put(
  "/:id",
  verifyJWT,
  admin,
  upload.single("image"), // middleware para subir la imagen
  validatorHandler(getUserSchema, "params"),
  validatorHandler(updateUserSchema, "body"),
  userController.updateUser
);
// api para eliminar un usuario
router.delete(
  "/:id",
  verifyJWT,
  admin,
  validatorHandler(getUserSchema, "params"),
  userController.deleteUser
);

module.exports = router;
