require("dotenv").config();

// Configuración de la aplicación
const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  secretKey: process.env.SECRET_KEY,
  jwtExpirationTime: process.env.JWT_EXPIRATION_TIME || "24h",
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
};

module.exports = { config };
