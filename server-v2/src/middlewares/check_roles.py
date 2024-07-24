from functools import wraps
from flask import request, jsonify

def check_roles(allowed_roles):
  def decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
      user_roles = request.user_roles # Obtener los roles del usuario desde la petición

      # Verificar si los roles del usuario coinciden con los roles permitidos
      if any(role in allowed_roles for role in user_roles):
        return func(*args, **kwargs)
      else:
        return jsonify({'message': 'You do not have permission to access this route'}), 403

    return wrapper
  return decorator
