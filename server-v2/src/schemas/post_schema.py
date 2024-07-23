import config.db as db

ma = db.ma

class PostSchema(ma.Schema):
  class Meta:
    fields = ('id', 'title', 'content', 'created_at', 'user_id')
  
post_schema = PostSchema()
posts_schema = PostSchema(many=True)
