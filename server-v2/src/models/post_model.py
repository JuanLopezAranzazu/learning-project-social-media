from datetime import datetime
import config.db as db

db = db.db

class Post(db.Model):
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  title = db.Column(db.String(80), nullable=False)
  content = db.Column(db.Text, nullable=False)
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
  # Relación con la tabla User
  user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

  def __init__(self, title, content, user_id):
    self.title = title
    self.content = content
    self.user_id = user_id
