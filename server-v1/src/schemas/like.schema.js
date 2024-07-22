const Joi = require("joi");

// Definición de los esquemas para la entidad Like
const id = Joi.number();
const postId = Joi.number();

const createLikeSchema = Joi.object({
  postId: postId.required(),
});

const updateLikeSchema = Joi.object({
  postId: postId,
});

const getLikeSchema = Joi.object({
  id: id.required(),
});

module.exports = { createLikeSchema, updateLikeSchema, getLikeSchema };
