const express = require("express");
const cors = require("cors");
const { config } = require("./config/config");
// middlewares
const {
  logErrors,
  errorHandler,
  wrapErrors,
} = require("./middlewares/errorHandler");
const sequelize = require("./db/sequelize");

const port = config.port;
const app = express();

// config express
const corsOptions = {
  origin: "*",
  optionSuccessStatus: 200,
};

// middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logErrors);
app.use(errorHandler);
app.use(wrapErrors);

// routes
const routes = require("./routes/index");
routes(app);

// Verificar conexión a la base de datos
app.post("/db-check", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.send(true);
  } catch (error) {
    res.send(false);
  }
});

// Iniciar servidor
app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`));
