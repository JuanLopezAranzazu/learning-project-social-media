const boom = require("@hapi/boom");
const argon2 = require("argon2");
// utils
const generateToken = require("./../utils/generateToken");
// services
const UserService = require("../services/user.service");
const userService = new UserService();

// Controlador para la autenticación
class AuthController {
  constructor() {}

  async registerUser(req, res, next) {
    try {
      const { body } = req;
      const { email, password, ...rest } = body;
      // validar que el email no exista
      const emailExists = await userService.findByEmail(email);
      if (emailExists) {
        throw boom.badRequest("Email already exists");
      }
      // encriptar la contraseña
      const hash = await argon2.hash(password);
      // guardar el usuario en la base de datos
      const savedUser = userService.create({
        email,
        password: hash,
        ...rest,
      });
      return res.status(200).json(savedUser);
    } catch (error) {
      next(error);
    }
  }

  async userLogin(req, res, next) {
    try {
      const { body } = req;
      const { email, password } = body;
      // buscar el usuario en la base de datos y comparar contraseñas
      const foundUser = await userService.findByEmail(email);
      const passwordMatch =
        foundUser && (await argon2.verify(foundUser.password, password));

      if (!passwordMatch) {
        throw boom.unauthorized("Invalid email or password");
      }
      // payload del token
      const payload = { userId: foundUser.id, isAdmin: foundUser.isAdmin };
      // generar token
      const token = generateToken(payload);
      return res.status(200).json({ token, user: foundUser });
    } catch (error) {
      next(error);
    }
  }

  async whoAmI(req, res, next) {
    try {
      const { userId } = req; // user authenticated
      const user = await userService.findOne(userId);
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
