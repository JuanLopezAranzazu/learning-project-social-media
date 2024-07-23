from flask import Blueprint, jsonify, request
import models.comment_model as comment_model
import schemas.comment_schema as comment_schema
# middlewares
import middlewares.verify_token as verify_token
import config.db as db
import utils.object as object

db = db.db
Comment = comment_model.Comment
comments_schema = comment_schema.comments_schema
comment_schema = comment_schema.comment_schema
verify_access_token = verify_token.verify_access_token
set_data = object.set_data

# Crear un Blueprint para las rutas de los comentarios
comment_bp = Blueprint('comment', __name__)
prefix="/comment"

@comment_bp.route(f'{prefix}', methods=['GET'])
@verify_access_token
def get_comments():
  comments = Comment.query.all()
  return jsonify(comments_schema.dump(comments))

@comment_bp.route(f'{prefix}/post/<int:id>', methods=['GET'])
@verify_access_token
def get_comments_by_post(id: int):
  comments = Comment.query.filter_by(post_id=id).all()
  return jsonify(comments_schema.dump(comments))

@comment_bp.route(f'{prefix}/<int:id>', methods=['GET'])
@verify_access_token
def get_comment(id: int):
  comment = Comment.query.get(id)

  if not comment:
    return jsonify({'message': 'Comment not found'}), 404

  return jsonify(comment_schema.dump(comment))

@comment_bp.route(f'{prefix}', methods=['POST'])
@verify_access_token
def create_comment():
  user_id = request.user_id # obtenemos el id del usuario desde el token
  data = request.get_json()
  data['user_id'] = user_id
  new_comment = Comment(**data)

  db.session.add(new_comment)
  db.session.commit()

  return jsonify(comment_schema.dump(new_comment)), 201

@comment_bp.route(f'{prefix}/<int:id>', methods=['PUT'])
@verify_access_token
def update_comment(id: int):
  user_id = request.user_id # obtenemos el id del usuario desde el token
  comment = Comment.query.filter_by(id=id, user_id=user_id).first()

  if not comment:
    return jsonify({'message': 'Comment not found'}), 404

  data = request.get_json()

  set_data(comment, data)

  db.session.commit()

  return jsonify(comment_schema.dump(comment))

@comment_bp.route(f'{prefix}/<int:id>', methods=['DELETE'])
@verify_access_token
def delete_comment(id: int):
  user_id = request.user_id # obtenemos el id del usuario desde el token
  comment = Comment.query.filter_by(id=id, user_id=user_id).first()

  if not comment:
    return jsonify({'message': 'Comment not found'}), 404

  db.session.delete(comment)
  db.session.commit()

  return jsonify({'message': 'Comment deleted'}), 204

