const { Model, DataTypes, Sequelize } = require("sequelize");
const LIKE_TABLE = "like";

const LikeSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
};

class Like extends Model {
  static associate(models) {
    // Relación 1:N entre User y Like
    this.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
    // Relación 1:N entre Post y Like
    this.belongsTo(models.Post, {
      foreignKey: "postId",
      as: "post",
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: LIKE_TABLE,
      modelName: "Like",
      timestamps: false,
    };
  }
}

module.exports = { LIKE_TABLE, LikeSchema, Like };
