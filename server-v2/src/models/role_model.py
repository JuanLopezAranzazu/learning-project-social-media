from datetime import datetime
import config.db as db

db = db.db

class Role(db.Model):
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  name = db.Column(db.String(80), unique=True, nullable=False)
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

  def __init__(self, name):
    self.name = name
