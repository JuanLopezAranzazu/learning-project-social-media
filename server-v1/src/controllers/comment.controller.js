// services
const CommnetService = require("../services/comment.service");
const commentService = new CommnetService();

// Controlador para los comentarios
class CommentController {
  constructor() {}

  async findAllComments(req, res, next) {
    try {
      const comments = await commentService.findAll();
      return res.status(200).json(comments);
    } catch (error) {
      next(error);
    }
  }

  // obtener todos los comentarios de un post
  async findAllCommentsByPost(req, res, next) {
    try {
      const { params } = req;
      const { id } = params;
      const comments = await commentService.findAllByPost(id);
      return res.status(200).json(comments);
    } catch (error) {
      next(error);
    }
  }

  async findOneComment(req, res, next) {
    try {
      const { params } = req;
      const { id } = params;
      const foundComment = await commentService.findOne(id);
      return res.status(200).json(foundComment);
    } catch (error) {
      next(error);
    }
  }

  async createComment(req, res, next) {
    try {
      const { body, userId } = req;
      const savedComment = await commentService.create({
        ...body,
        userId,
      });
      return res.status(201).json(savedComment);
    } catch (error) {
      next(error);
    }
  }

  async updateComment(req, res, next) {
    try {
      const { params, body, userId } = req;
      const { id } = params;
      const updatedComment = await commentService.update(id, userId, {
        ...body,
        userId,
      });
      return res.status(200).json(updatedComment);
    } catch (error) {
      next(error);
    }
  }

  async deleteComment(req, res, next) {
    try {
      const { params, userId } = req;
      const { id } = params;
      const message = await commentService.delete(id, userId);
      return res.status(200).json(message);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CommentController;
