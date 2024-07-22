const { Model, DataTypes, Sequelize } = require("sequelize");
const POST_TABLE = "post";

const PostSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  content: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  image: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
};

class Post extends Model {
  static associate(models) {
    // Relación 1:N entre User y Post
    this.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: POST_TABLE,
      modelName: "Post",
      timestamps: false,
    };
  }
}

module.exports = { POST_TABLE, PostSchema, Post };
