const boom = require("@hapi/boom");
const { models } = require("./../db/sequelize");

// Logica de negocio para la entidad User
class UserService {
  constructor() {}

  // Funcion para obtener todos los usuarios
  async findAll() {
    const users = await models.User.findAll({
      attributes: { exclude: ["password"] },
    });
    return users;
  }

  // Funcion para obtener un usuario por ID
  async findOne(id) {
    const user = await models.User.findOne({
      where: { id },
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      throw boom.notFound("User not found");
    }
    return user;
  }

  // Funcion para obtener un usuario por email
  async findByEmail(email) {
    const user = await models.User.findOne({
      where: { email },
    });
    return user;
  }

  // Funcion para crear un usuario
  async create(payload) {
    const savedUser = await models.User.create(payload, { returning: true });
    return savedUser;
  }

  // Funcion para actualizar un usuario
  async update(id, payload) {
    const user = await this.findOne(id);
    if (!user) {
      throw boom.notFound("User not found");
    }
    const updatedUser = await user.update(payload, { returning: true });
    return updatedUser;
  }

  // Funcion para eliminar un usuario
  async delete(id) {
    const user = await this.findOne(id);
    if (!user) {
      throw boom.notFound("User not found");
    }
    await user.destroy();
    return { message: "Post deleted" };
  }
}

module.exports = UserService;
