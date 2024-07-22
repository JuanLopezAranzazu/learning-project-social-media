// services
const UserService = require("../services/user.service");
const userService = new UserService();

// Controlador para el usuario
class UserController {
  constructor() {}

  async findAllUsers(req, res, next) {
    try {
      const users = await userService.findAll();
      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  async findOneUser(req, res, next) {
    try {
      const { params } = req;
      const { id } = params;
      const foundUser = await userService.findOne(id);
      return res.status(200).json(foundUser);
    } catch (error) {
      next(error);
    }
  }

  async createUser(req, res, next) {
    try {
      const { body } = req;
      const savedUser = await userService.create({
        ...body,
        image: req.file ? `/uploads/${req.file.filename}` : null,
      });
      return res.status(201).json(savedUser);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const { params, body } = req;
      const { id } = params;
      const updatedUser = await userService.update(id, {
        ...body,
        image: req.file ? `/uploads/${req.file.filename}` : null,
      });
      return res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { params } = req;
      const { id } = params;
      const message = await userService.delete(id);
      return res.status(200).json(message);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
