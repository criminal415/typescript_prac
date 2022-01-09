import express from 'express';
import Sequelize from 'sequelize';
import { Hashtag, Image, Post } from '../models';
import User from '../models/user';

const router = express.Router();

router.get('/:tag', async (req, res, next) => {
  try {
    let where = {};
    if (req.query.lastId) {
      where = {
        id: {
          [Sequelize.Op.lt]: req.query.lastId,
        },
      };
    }
    const posts = await Post.findAll({
      where,
      include: [
        {
          model: Hashtag,
          where: { name: decodeURIComponent(req.params.tag) },
        },
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
        {
          model: User,
          as: 'Likers',
          attributes: ['id', 'nickname'],
        },
        {
          model: Image,
        },
        {
          model: User,
          as: 'Likers',
          attributes: ['id'],
        },
        {
          model: Post,
          as: 'Retweet',
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
            {
              model: Image,
            },
          ],
          order: [['createdAt', 'DESC']],
          limit: parseInt(JSON.stringify(req.query.limit).replace(/\"/g, ''), 10),
        },
      ],
    });
    return res.json(posts);
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

export default router;
