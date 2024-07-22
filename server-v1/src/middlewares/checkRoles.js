const boom = require("@hapi/boom");

// Middleware para verificar si el usuario es administrador
const admin = (req, res, next) => {
  if (req.isAdmin) {
    next();
  } else {
    throw boom.unauthorized(
      "You do not have permission to access this resource"
    );
  }
};

module.exports = admin;
