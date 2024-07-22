const { User, UserSchema } = require("./user.model");
const { Post, PostSchema } = require("./post.model");
const { Comment, CommentSchema } = require("./comment.model");
const { Like, LikeSchema } = require("./like.model");

// Función para definir los modelos de la base de datos
function models(sequelize) {
  // Inicialización de los modelos
  User.init(UserSchema, User.config(sequelize));
  Post.init(PostSchema, Post.config(sequelize));
  Comment.init(CommentSchema, Comment.config(sequelize));
  Like.init(LikeSchema, Like.config(sequelize));
  // Definición de las relaciones entre los modelos
  User.associate(sequelize.models);
  Post.associate(sequelize.models);
  Comment.associate(sequelize.models);
  Like.associate(sequelize.models);
}

module.exports = models;
