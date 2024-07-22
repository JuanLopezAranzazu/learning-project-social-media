const { config } = require("./../config/config");
const jwt = require("jsonwebtoken");

// Función para generar un token
const generateToken = (payload) => {
  return jwt.sign(payload, config.secretKey, {
    expiresIn: config.jwtExpirationTime,
  });
};

module.exports = generateToken;
