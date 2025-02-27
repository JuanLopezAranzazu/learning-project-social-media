const express = require("express");
// routes
const authRouter = require("./auth.router");
const userRouter = require("./user.router");
const postRouter = require("./post.router");
const commentRouter = require("./comment.router");
const likeRouter = require("./like.router");

// Funcion para definir las rutas de la API
function routes(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/auth", authRouter);
  router.use("/user", userRouter);
  router.use("/post", postRouter);
  router.use("/comment", commentRouter);
  router.use("/like", likeRouter);
}

module.exports = routes;
