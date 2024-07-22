const { Model, DataTypes, Sequelize } = require("sequelize");
const COMMENT_TABLE = "comment";

const CommentSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  content: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
};

class Comment extends Model {
  static associate(models) {
    // Relación 1:N entre Post y Comment
    this.belongsTo(models.Post, {
      foreignKey: "postId",
      as: "post",
    });
    // Relación 1:N entre User y Comment
    this.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: COMMENT_TABLE,
      modelName: "Comment",
      timestamps: false,
    };
  }
}

module.exports = { COMMENT_TABLE, CommentSchema, Comment };
