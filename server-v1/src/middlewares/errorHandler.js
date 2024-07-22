const boom = require("@hapi/boom");
const { config } = require("../config/config");

// Funcion para logear los errores
function logErrors(err, req, res, next) {
  console.log("logErrors");
  console.error(err);
  next(err);
}

// Funcion para manejar los errores
function errorHandler(err, req, res, next) {
  console.log("errorHandler");
  res.status(500).json({
    message: err.message,
    stack: config.env === "test" ? err.stack : {},
  });
}

// Funcion para manejar los errores de boom
function wrapErrors(err, req, res, next) {
  console.log("wrapErrors");
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }
  next(err);
}

module.exports = { logErrors, errorHandler, wrapErrors };
