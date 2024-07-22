const express = require("express");
// routes
const authRouter = require("./auth.router");
const userRouter = require("./user.router");
const postRouter = require("./post.router");

// Funcion para definir las rutas de la API
function routes(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/auth", authRouter);
  router.use("/user", userRouter);
  router.use("/post", postRouter);
}

module.exports = routes;
