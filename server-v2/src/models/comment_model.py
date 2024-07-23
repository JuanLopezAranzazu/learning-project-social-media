from datetime import datetime
import config.db as db

db = db.db

class Comment(db.Model):
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  content = db.Column(db.Text, nullable=False)
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
  # Relación con la tabla User
  user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
  # Relación con la tabla Post
  post_id = db.Column(db.Integer, db.ForeignKey('post.id'), nullable=False)

  def __init__(self, content, user_id, post_id):
    self.content = content
    self.user_id = user_id
    self.post_id = post_id
