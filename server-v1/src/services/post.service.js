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

  async create(payload) {
    const savedUser = await models.User.create(payload, { returning: true });
    return savedUser;
  }

  async update(id, payload) {
    const post = await this.findOne(id);
    if (!post) {
      throw boom.notFound("Post not found");
    }
    const updatedPost = await post.update(payload, { returning: true });
    return updatedPost;
  }

  async delete(id) {
    const post = await this.findOne(id);
    if (!post) {
      throw boom.notFound("Post not found");
    }
    await post.destroy();
    return id;
  }
}

module.exports = PostService;
