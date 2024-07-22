// services
const PostService = require("../services/post.service");
const postService = new PostService();

// Controlador para las publicaciones
class PostController {
  constructor() {}

  async findAllPosts(req, res, next) {
    try {
      const posts = await postService.findAll();
      return res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  }

  // obtener todas las publicaciones de un usuario
  async findAllPostsByUser(req, res, next) {
    try {
      const { userId } = req;
      const posts = await postService.findAllByUser(userId);
      return res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  }

  async findOnePost(req, res, next) {
    try {
      const { params } = req;
      const { id } = params;
      const foundPost = await postService.findOne(id);
      return res.status(200).json(foundPost);
    } catch (error) {
      next(error);
    }
  }

  async createPost(req, res, next) {
    try {
      const { body, userId } = req;
      const savedPost = await postService.create({
        ...body,
        userId,
        image: req.file ? `/uploads/${req.file.filename}` : null,
      });
      return res.status(201).json(savedPost);
    } catch (error) {
      next(error);
    }
  }

  async updatePost(req, res, next) {
    try {
      const { params, body, userId } = req;
      const { id } = params;
      const updatedPost = await postService.update(id, userId, {
        ...body,
        userId,
        image: req.file ? `/uploads/${req.file.filename}` : null,
      });
      return res.status(200).json(updatedPost);
    } catch (error) {
      next(error);
    }
  }

  async deletePost(req, res, next) {
    try {
      const { params, userId } = req;
      const { id } = params;
      const message = await postService.delete(id, userId);
      return res.status(200).json(message);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PostController;
