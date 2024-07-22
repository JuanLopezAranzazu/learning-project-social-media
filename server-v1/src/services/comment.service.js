const boom = require("@hapi/boom");
const { models } = require("./../db/sequelize");

// Logica de negocio para la entidad Post
class CommentService {
  constructor() {}

  async findAll() {
    const comments = await models.Comment.findAll();
    return comments;
  }

  async findAllByPost(postId) {
    const comments = await models.Comment.findAll({
      where: { postId },
    });
    return comments;
  }

  async findOne(id) {
    const comment = await models.Comment.findOne({
      where: { id },
    });
    if (!comment) {
      throw boom.notFound("Comment not found");
    }
    return comment;
  }

  async findOneByUser(id, userId) {
    const comment = await models.Comment.findOne({
      where: { id, userId },
    });
    if (!comment) {
      throw boom.notFound("Comment not found");
    }
    return comment;
  }

  async create(payload) {
    const savedComment = await models.Comment.create(payload, {
      returning: true,
    });
    return savedComment;
  }

  async update(id, userId, payload) {
    const comment = await this.findOneByUser(id, userId);
    if (!comment) {
      throw boom.notFound("Comment not found");
    }
    const updatedComment = await Comment.update(payload, { returning: true });
    return updatedComment;
  }

  async delete(id, userId) {
    const comment = await this.findOneByUser(id, userId);
    if (!comment) {
      throw boom.notFound("Comment not found");
    }
    await comment.destroy();
    return id;
  }
}

module.exports = CommentService;
