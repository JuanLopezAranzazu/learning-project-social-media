const Joi = require("joi");

// Definición de los esquemas para la entidad Comment
const id = Joi.number();
const content = Joi.string();
const postId = Joi.number();

const createCommentSchema = Joi.object({
  content: content.required(),
  postId: postId.required(),
});

const updateCommentSchema = Joi.object({
  content: content,
  postId: postId,
});

const getCommentSchema = Joi.object({
  id: id.required(),
});

module.exports = { createCommentSchema, updateCommentSchema, getCommentSchema };
