import express from 'express';
import path from 'path';

import multer from 'multer';
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';
import BlueBird from 'bluebird';

import { Post, Hashtag, Image } from '../models';

import { isLoggedIn } from '../middlewares/middlewares';
import User from '../models/user';
import Comment from '../models/comment';

const router = express.Router();

AWS.config.update({
  region: 'ap-northest-2',
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: 'ozam',
    key(req, file, cb) {
      cb(null, `original/${Date.now()}${path.basename(file.originalname)}`);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    const hashtags: string[] = req.body.content.match(/#[^\s]+/g);
    const newPost = await Post.create({
      content: req.body.content,
      UserId: req.user!.id,
    });
    if (hashtags) {
      const promises = hashtags.map((tag) =>
        Hashtag.findOrCreate({
          where: { name: tag.slice(1).toLowerCase() },
        })
      );
      const result = await Promise.all(promises);
      await newPost.addHashtags(result.map((r) => r[0]));
    }
    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        const promises: BlueBird<Image>[] = req.body.image.map((image: string) => Image.create({ src: image }));
        const images = await Promise.all(promises);
        await newPost.addImages(images);
      } else {
        const image = await Image.create({ src: req.body.image });
        await newPost.addImage(image);
      }
    }
    const fullPost = await Post.findOne({
      where: { id: newPost.id },
      include: [
        {
          model: User,
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
      ],
    });
    return res.json(fullPost);
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

router.post('/images', upload.array('image'), (req, res, next) => {
  console.log(req.files);

  res.json((req.files as Express.MulterS3.File[]).map((v) => v.location));
});

router.get('./:id', async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: User,
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
      ],
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
});

router.delete('/:id', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res.status(404).send('???????????? ???????????? ????????????.');
    }
    await Post.destroy({ where: { id: req.params.id } });
    return res.send(req.params.id);
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

router.get('/:id/comments', async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res.status(404).send('???????????? ???????????? ????????????.');
    }
    const comments = await Comment.findAll({
      where: {
        PostId: req.params.id,
      },
      order: [['createdAt', 'ASC']],
      include: [
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
      ],
    });
    return res.json(comments);
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

router.post('/:id/comment', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res.status(404).send('???????????? ???????????? ????????????.');
    }
    const newComments = await Comment.create({
      PostId: post.id,
      UserId: req.user!.id,
      content: req.body.content,
    });
    const comment = await Comment.findOne({
      where: {
        id: newComments.id,
      },
      include: [
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
      ],
    });

    return res.json(comment);
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

router.post('/:id/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res.status(404).send('???????????? ???????????? ????????????.');
    }
    await post.addLiker(req.user!.id);
    return res.json({ userId: req.user!.id });
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

router.delete('/:id/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res.status(404).send('???????????? ???????????? ????????????.');
    }
    await post.removeLiker(req.user!.id);
    return res.json({ userId: req.user!.id });
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

router.post('/:id/retweet', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Post,
          as: 'Retweet',
        },
      ],
    });
    if (!post) {
      return res.status(404).send('???????????? ???????????? ????????????.');
    }
    if (req.user!.id === post.UserId || (post.Retweet && post.Retweet.UserId === req.user!.id)) {
      return res.status(403).send('????????? ?????? ???????????? ??? ????????????.');
    }
    const retweetTargetId = post.RetweetId || post.id;
    const exPost = await Post.findOne({
      where: {
        UserId: req.user!.id,
        RetweetId: retweetTargetId,
      },
    });
    if (exPost) {
      return res.status(403).send('?????? ?????????????????????.');
    }
    const retweet = await Post.create({
      UserId: req.user!.id,
      RetweetId: retweetTargetId,
      content: 'retweet',
    });
    const retweetWithPrevPost = await Post.findOne({
      where: { id: retweet.id },
      include: [
        {
          model: User,
          attributes: ['id', 'nickname'],
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
        },
      ],
    });
    return res.json(retweetWithPrevPost);
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

export default router;
