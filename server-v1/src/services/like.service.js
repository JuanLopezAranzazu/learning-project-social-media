const boom = require("@hapi/boom");
const { models } = require("./../db/sequelize");

// Logica de negocio para la entidad Like
class LikeService {
  constructor() {}

  async findAll() {
    const likes = await models.Like.findAll();
    return likes;
  }

  async findAllByPost(postId) {
    const likes = await models.Like.findAll({
      where: { postId },
    });
    return likes;
  }

  async findOne(id) {
    const like = await models.Like.findOne({
      where: { id },
    });
    if (!like) {
      throw boom.notFound("Like not found");
    }
    return like;
  }

  async findOneByUser(id, userId) {
    const like = await models.Like.findOne({
      where: { id, userId },
    });
    if (!like) {
      throw boom.notFound("Like not found");
    }
    return like;
  }

  async create(payload) {
    const savedLike = await models.Like.create(payload, {
      returning: true,
    });
    return savedLike;
  }

  async update(id, userId, payload) {
    const like = await this.findOneByUser(id, userId);
    if (!like) {
      throw boom.notFound("Like not found");
    }
    const updatedLike = await Like.update(payload, { returning: true });
    return updatedLike;
  }

  async delete(id, userId) {
    const like = await this.findOneByUser(id, userId);
    if (!like) {
      throw boom.notFound("Like not found");
    }
    await like.destroy();
    return { message: "Like deleted" };
  }
}

module.exports = LikeService;
