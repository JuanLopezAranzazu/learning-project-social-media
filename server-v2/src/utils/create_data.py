import config.db as db
import models.role_model as role_model

db = db.db
Role = role_model.Role

# Función para crear roles
def create_roles():
  # verificar si existen roles
  roles_count = Role.query.count()

  if roles_count > 0:
    return

  roles = [
    Role(name='admin'),
    Role(name='user')
  ]

  for role in roles:
    db.session.add(role)

  db.session.commit()
