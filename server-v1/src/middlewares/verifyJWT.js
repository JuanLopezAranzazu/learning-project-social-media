const boom = require("@hapi/boom");
const { config } = require("../config/config");
const jwt = require("jsonwebtoken");

// Middleware para verificar el token
function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      throw boom.unauthorized("Token not found");
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, config.secretKey);
    req.userId = decoded.userId;
    req.isAdmin = decoded.isAdmin;
    next();
  } catch (error) {
    throw boom.unauthorized("Invalid token");
  }
}

module.exports = verifyToken;
