from datetime import datetime
import config.db as db

db = db.db

# Relacion Many-to-Many entre User y Role
user_roles = db.Table('user_roles',
  db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
  db.Column('role_id', db.Integer, db.ForeignKey('role.id'), primary_key=True)
)

class User(db.Model):
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  username = db.Column(db.String(80), unique=True, nullable=False)
  email = db.Column(db.String(120), unique=True, nullable=False)
  password = db.Column(db.String(120), nullable=False)
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
  roles = db.relationship('Role', secondary=user_roles, lazy='subquery',
                            backref=db.backref('users', lazy=True))

  def __init__(self, username, email, password):
    self.username = username
    self.email = email
    self.password = password

