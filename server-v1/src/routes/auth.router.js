const express = require("express");
const router = express.Router();
//controllers
const AuthController = require("./../controllers/auth.controller");
const authController = new AuthController();
//middlewares
const verifyJWT = require("./../middlewares/verifyJWT");
const upload = require("./../middlewares/uploadConfig");
const validatorHandler = require("./../middlewares/validatorHandler");
// schemas
const { createUserSchema, loginUserSchema } = require("../schemas/user.schema");

// routes
// api para registrar un usuario
router.post(
  "/register",
  upload.single("image"), // middleware para subir la imagen
  validatorHandler(createUserSchema, "body"),
  authController.registerUser
);
// api para iniciar sesión
router.post(
  "/login",
  validatorHandler(loginUserSchema, "body"),
  authController.userLogin
);
// api para obtener la información del usuario autenticado
router.get("/whoami", verifyJWT, authController.whoAmI);

module.exports = router;
