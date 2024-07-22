const Joi = require("joi");

const id = Joi.number();
const title = Joi.string().min(3).max(30);
const content = Joi.string();
const image = Joi.string();

const createPostSchema = Joi.object({
  title: title.required(),
  content: content.required(),
  image: image,
});

const updatePostSchema = Joi.object({
  title: title,
  content: content,
  image: image,
});

const getPostSchema = Joi.object({
  id: id.required(),
});

module.exports = { createPostSchema, updatePostSchema, getPostSchema };
