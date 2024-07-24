from flask import Blueprint, jsonify, request
from passlib.context import CryptContext
import models.user_model as user_model
import schemas.user_schema as user_schema
import models.role_model as role_model
import utils.generate_token as generate_token
import config.db as db
# middlewares
import middlewares.verify_token as verify_token

db = db.db
User = user_model.User
user_schema = user_schema.user_schema
Role = role_model.Role
create_access_token = generate_token.create_access_token
verify_access_token = verify_token.verify_access_token

# Crear un Blueprint para las rutas de usuarios
auth_bp = Blueprint('auth', __name__)
prefix="/auth"

# Para encriptar la contraseña
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@auth_bp.route(f'{prefix}/login', methods=['POST'])
def login():
  data = request.get_json()

  user = User.query.filter_by(username=data['username']).first()

  if not user:
    return jsonify({'message': 'User not found'}), 404

  if not pwd_context.verify(data['password'], user.password):
    return jsonify({'message': 'Invalid credentials'}), 401
  
  # Obtener roles del usuario
  roles = [role.name for role in user.roles]

  access_token = create_access_token(data={"user_id": user.id, "roles": roles})

  return jsonify({"access_token": access_token})

@auth_bp.route(f'{prefix}/register', methods=['POST'])
def register():
  data = request.get_json()

  user = User.query.filter_by(username=data['username']).first()

  if user:
    return jsonify({'message': 'Username already exists'}), 400

  new_user = User(**data)
  new_user.password = pwd_context.hash(data['password'])

  # Agregar rol de usuario
  user_role = Role.query.filter_by(name='user').first()

  if not user_role:
    return jsonify({'message': 'Role not found'}), 404

  new_user.roles=[user_role]

  db.session.add(new_user)
  db.session.commit()

  return jsonify(user_schema.dump(new_user)), 201

@auth_bp.route(f'{prefix}/me', methods=['GET'])
@verify_access_token
def me():
  user_id = request.user_id # obtenemos el id del usuario desde el token
  user = User.query.get(user_id)

  if not user:
    return jsonify({'message': 'User not found'}), 404

  return jsonify(user_schema.dump(user))
