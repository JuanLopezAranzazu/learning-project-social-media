from flask import Blueprint, jsonify, request
import models.post_model as post_model
import schemas.post_schema as post_schema
# middlewares
import middlewares.verify_token as verify_token
import config.db as db
import utils.object as object

db = db.db
Post = post_model.Post
posts_schema = post_schema.posts_schema
post_schema = post_schema.post_schema
verify_access_token = verify_token.verify_access_token
set_data = object.set_data

# Crear un Blueprint para las rutas de las publicaciones
post_bp = Blueprint('post', __name__)
prefix="/post"

@post_bp.route(f'{prefix}', methods=['GET'])
@verify_access_token
def get_posts():
  posts = Post.query.all()
  return jsonify(posts_schema.dump(posts))

@post_bp.route(f'{prefix}/user', methods=['GET'])
@verify_access_token
def get_posts_by_user():
  user_id = request.user_id # obtenemos el id del usuario desde el token
  posts = Post.query.filter_by(user_id=user_id).all()
  return jsonify(posts_schema.dump(posts))

@post_bp.route(f'{prefix}/<int:id>', methods=['GET'])
@verify_access_token
def get_post(id: int):
  post = Post.query.get(id)

  if not post:
    return jsonify({'message': 'Post not found'}), 404

  return jsonify(post_schema.dump(post))

@post_bp.route(f'{prefix}', methods=['POST'])
@verify_access_token
def create_post():
  user_id = request.user_id # obtenemos el id del usuario desde el token
  data = request.get_json()
  data['user_id'] = user_id
  new_post = Post(**data)

  db.session.add(new_post)
  db.session.commit()

  return jsonify(post_schema.dump(new_post)), 201

@post_bp.route(f'{prefix}/<int:id>', methods=['PUT'])
@verify_access_token
def update_post(id: int):
  user_id = request.user_id # obtenemos el id del usuario desde el token
  post = Post.query.filter_by(id=id, user_id=user_id).first()

  if not post:
    return jsonify({'message': 'Post not found'}), 404

  data = request.get_json()

  set_data(post, data)

  db.session.commit()

  return jsonify(post_schema.dump(post))

@post_bp.route(f'{prefix}/<int:id>', methods=['DELETE'])
@verify_access_token
def delete_post(id: int):
  user_id = request.user_id # obtenemos el id del usuario desde el token
  post = Post.query.filter_by(id=id, user_id=user_id).first()

  if not post:
    return jsonify({'message': 'Post not found'}), 404

  db.session.delete(post)
  db.session.commit()

  return jsonify({'message': 'User deleted'}), 204

