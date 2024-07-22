const Joi = require("joi");

const id = Joi.number();
const name = Joi.string().min(3).max(30);
const email = Joi.string().email();
const password = Joi.string().min(3).max(30);
const viewedProfile = Joi.number();
const image = Joi.string();

const createUserSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
  viewedProfile: viewedProfile,
  image: image,
});

const updateUserSchema = Joi.object({
  name: name,
  email: email,
  password: password,
  viewedProfile: viewedProfile,
  image: image,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

const loginUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
  loginUserSchema,
};
