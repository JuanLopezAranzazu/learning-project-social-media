import config.db as db

ma = db.ma

class UserSchema(ma.Schema):
  class Meta:
    fields = ('id', 'username', 'email', 'password', 'created_at')

user_schema = UserSchema()
users_schema = UserSchema(many=True)
