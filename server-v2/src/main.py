from flask import Flask, jsonify, request
from config.db import db, ma
from config.config import config
import models.user_model as user_model
import models.post_model as post_model
import schemas.post_schema as post_schema
import schemas.user_schema as user_schema

# Crear la aplicación
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = f"postgresql://{config['db_user']}:{config['db_password']}@{config['db_host']}:{config['db_port']}/{config['db_name']}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Inicializar la base de datos
db.init_app(app)
ma.init_app(app)

# Crear la base de datos
with app.app_context():
  db.create_all()

# Ruta principal
@app.route('/')
def home():
  return "Hello, Flask!"

# Ruta para obtener datos
@app.route('/data', methods=['GET'])
def get_data():
  return jsonify({"message": "This is some data"}), 200

# Ruta para recibir datos (POST)
@app.route('/data', methods=['POST'])
def post_data():
  data = request.get_json()
  return jsonify({"received": data}), 201


# Rutas
import routes.auth_route as auth_route
import routes.user_route as user_route
import routes.post_route as post_route
# Registrar rutas
app.register_blueprint(auth_route.auth_bp)
app.register_blueprint(user_route.user_bp)
app.register_blueprint(post_route.post_bp)


# Manejador de errores 500
@app.errorhandler(500)
def handle_500_error(error):
  app.logger.error(f"Server Error: {error}")
  response = {
    "error": "Internal Server Error",
    "message": "An unexpected error occurred on the server."
  }
  return jsonify(response), 500

# Manejador de errores generales
@app.errorhandler(Exception)
def handle_exception(e):
  app.logger.error(f"Unhandled Exception: {e}")
  response = {
    "error": "Internal Server Error",
    "message": str(e) if app.config['DEBUG'] else "An unexpected error occurred on the server."
  }
  return jsonify(response), 500

if __name__ == '__main__':
  # Ejecutar la aplicación
  port = config["port"]
  app.run(debug=True, port=port)
