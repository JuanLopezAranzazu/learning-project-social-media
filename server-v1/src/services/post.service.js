const boom = require("@hapi/boom");
const { models } = require("./../db/sequelize");

// Logica de negocio para la entidad Post
class PostService {
  constructor() {}

  async findAll() {
    const posts = await models.Post.findAll();
    return posts;
  }

  async findAllByUser(userId) {
    const posts = await models.Post.findAll({
      where: { userId },
    });
    return posts;
  }

  async findOne(id) {
    const post = await models.Post.findOne({
      where: { id },
    });
    if (!post) {
      throw boom.notFound("Post not found");
    }
    return post;
  }

  async findOneByUser(id, userId) {
    const post = await models.Post.findOne({
      where: { id, userId },
    });
    if (!post) {
      throw boom.notFound("Post not found");
    }
    return post;
  }

  async create(payload) {
    const savedUser = await models.User.create(payload, { returning: true });
    return savedUser;
  }

  async update(id, userId, payload) {
    const post = await this.findOneByUser(id, userId);
    if (!post) {
      throw boom.notFound("Post not found");
    }
    const updatedPost = await post.update(payload, { returning: true });
    return updatedPost;
  }

  async delete(id, userId) {
    const post = await this.findOneByUser(id, userId);
    if (!post) {
      throw boom.notFound("Post not found");
    }
    await post.destroy();
    return { message: "Post deleted" };
  }
}

module.exports = PostService;
