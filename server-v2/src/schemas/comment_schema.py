import config.db as db

ma = db.ma

class CommentSchema(ma.Schema):
  class Meta:
    fields = ('id', 'content', 'created_at', 'user_id', 'post_id')

comment_schema = CommentSchema()
comments_schema = CommentSchema(many=True)
