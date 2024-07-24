from flask import Blueprint, jsonify, request
from passlib.context import CryptContext
import models.user_model as user_model
import schemas.user_schema as user_schema
import config.db as db
import utils.object as object
# middlewares
import middlewares.verify_token as verify_token
import middlewares.check_roles as check_roles

db = db.db
User = user_model.User
users_schema = user_schema.users_schema
user_schema = user_schema.user_schema
set_data = object.set_data
verify_access_token = verify_token.verify_access_token
check_roles = check_roles.check_roles

# Crear un Blueprint para las rutas de usuarios
user_bp = Blueprint('user', __name__)
prefix="/user"

# Para encriptar la contraseña
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@user_bp.route(f'{prefix}', methods=['GET'])
@verify_access_token
@check_roles(['admin', 'user'])
def get_users():
  users = User.query.all()
  return jsonify(users_schema.dump(users))

@user_bp.route(f'{prefix}/<int:id>', methods=['GET'])
def get_user(id: int):
  user = User.query.get(id)

  if not user:
    return jsonify({'message': 'User not found'}), 404

  return jsonify(user_schema.dump(user))

@user_bp.route(f'{prefix}', methods=['POST'])
def create_user():
  data = request.get_json()

  user = User.query.filter_by(username=data['username']).first()

  if user:
    return jsonify({'message': 'Username already exists'}), 400

  # Encriptar la contraseña
  data['password'] = pwd_context.hash(data['password'])

  new_user = User(**data)
  db.session.add(new_user)
  db.session.commit()

  return jsonify(user_schema.dump(new_user)), 201

@user_bp.route(f'{prefix}/<int:id>', methods=['PUT'])
def update_user(id: int):
  user = User.query.get(id)

  if not user:
    return jsonify({'message': 'User not found'}), 404

  data = request.get_json()

  # Encriptar la contraseña
  data['password'] = pwd_context.hash(data['password'])

  set_data(user, data)

  db.session.commit()

  return jsonify(user_schema.dump(user))

@user_bp.route(f'{prefix}/<int:id>', methods=['DELETE'])
def delete_user(id: int):
  user = User.query.get(id)

  if not user:
    return jsonify({'message': 'User not found'}), 404

  db.session.delete(user)
  db.session.commit()

  return jsonify({'message': 'User deleted'}), 204

