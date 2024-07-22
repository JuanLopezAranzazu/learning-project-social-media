const { Model, DataTypes, Sequelize } = require("sequelize");
const USER_TABLE = "user";

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  isAdmin: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  image: { // imagen de perfil
    allowNull: true,
    type: DataTypes.STRING,
  },
  viewedProfile: { // cantidad de veces que se ha visitado el perfil
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
};

class User extends Model {
  static associate(models) {
    // Relación 1:N entre User y Post
    this.hasMany(models.Post, {
      foreignKey: "userId",
      as: "posts",
    });
    // Relación 1:N entre User y Comment
    this.hasMany(models.Comment, {
      foreignKey: "userId",
      as: "comments",
    });
    // Relación 1:N entre User y Like
    this.hasMany(models.Like, {
      foreignKey: "userId",
      as: "likes",
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: "User",
      timestamps: false,
    };
  }
}

module.exports = { USER_TABLE, UserSchema, User };
