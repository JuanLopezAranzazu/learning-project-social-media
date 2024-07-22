// services
const LikeService = require("../services/like.service");
const likeService = new LikeService();

// Controlador para los likes
class LikeController {
  constructor() {}

  async findAllLikes(req, res, next) {
    try {
      const likes = await likeService.findAll();
      return res.status(200).json(likes);
    } catch (error) {
      next(error);
    }
  }

  async findAllLikesByPost(req, res, next) {
    try {
      const { params } = req;
      const { id } = params;
      const likes = await likeService.findAllByPost(id);
      return res.status(200).json(likes);
    } catch (error) {
      next(error);
    }
  }

  async findOneLike(req, res, next) {
    try {
      const { params } = req;
      const { id } = params;
      const foundLike = await likeService.findOne(id);
      return res.status(200).json(foundLike);
    } catch (error) {
      next(error);
    }
  }

  async createLike(req, res, next) {
    try {
      const { body, userId } = req;
      const savedLike = await likeService.create({
        ...body,
        userId,
      });
      return res.status(201).json(savedLike);
    } catch (error) {
      next(error);
    }
  }

  async updateLike(req, res, next) {
    try {
      const { params, body, userId } = req;
      const { id } = params;
      const updatedLike = await likeService.update(id, userId, {
        ...body,
        userId,
      });
      return res.status(200).json(updatedLike);
    } catch (error) {
      next(error);
    }
  }

  async deleteLike(req, res, next) {
    try {
      const { params, userId } = req;
      const { id } = params;
      const message = await likeService.delete(id, userId);
      return res.status(200).json(message);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = LikeController;
