import config.db as db

ma = db.ma

class RoleSchema(ma.Schema):
  class Meta:
    fields = ('id', 'name', 'created_at')

role_schema = RoleSchema()
roles_schema = RoleSchema(many=True)
