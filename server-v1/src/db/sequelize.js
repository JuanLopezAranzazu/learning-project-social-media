const { Sequelize } = require("sequelize");
const { config } = require("./../config/config");
const models = require("./models/index");

// Configuración de la conexión a la base de datos
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

// Crear la conexión a la base de datos
const sequelize = new Sequelize(URI, {
  dialect: "postgres",
  logging: true,
});

models(sequelize);
// sequelize.sync(); // Para crear las tablas en la base de datos

module.exports = sequelize;
