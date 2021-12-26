import * as express from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';
import Image from '../models/image';
import Post from '../models/post';
import User from '../models/user';

import { isLoggedIn, isNotLoggedIn } from '../middlewares/middlewares';

const router = express.Router();

type UserWithoutPassword = Omit<User, 'password'>;

router.get('/', isLoggedIn, (req, res) => {
  const user = req.user!.toJSON() as UserWithoutPassword;
  //   delete user.password;
  return res.json(user);
});

router.post('/', async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        userId: req.body.userId,
      },
    });
    if (exUser) {
      return res.status(403).send('이미 사용중인 아이디입니다.');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12); // salt는 10~13 사이로
    const newUser = await User.create({
      nickname: req.body.nickname,
      userId: req.body.userId,
      password: hashedPassword,
    });
    console.log(newUser);
    return res.status(200).json(newUser);
  } catch (e) {
    console.error(e);
    // 에러 처리를 여기서
    return next(e);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (err: Error, user: User, info: { message: string }) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.message);
    }
    return req.login(user, async (loginErr: Error) => {
      try {
        if (loginErr) {
          return next(loginErr);
        }
        const fullUser = await User.findOne({
          where: { id: user.id },
          include: [
            {
              model: Post,
              as: 'Posts',
              attributes: ['id'],
            },
            {
              model: User,
              as: 'Followings',
              attributes: ['id'],
            },
            {
              model: User,
              as: 'Followers',
              attributes: ['id'],
            },
          ],
          attributes: {
            exclude: ['password'],
          },
        });
        return res.json(fullUser);
      } catch (e) {
        console.error(e);
        return next(e);
      }
    });
  })(req, res, next);
});

router.post('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session!.destroy(() => {
    res.send('logout 성공');
  });
});

interface IUser extends User {
  PostCount: number;
  FollowingCount: number;
  FollowerCount: number;
}

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: parseInt(req.params.id, 10) },
      include: [
        {
          model: Post,
          as: 'Posts',
          attributes: ['id'],
        },
        {
          model: User,
          as: 'Followings',
          attributes: ['id'],
        },
        {
          model: User,
          as: 'Followers',
          attributes: ['id'],
        },
      ],
      attributes: ['id', 'nickname'],
    });
    if (!user) {
      return res.status(404).send('no user');
    }
    const jsonUser = user.toJSON() as IUser;
    jsonUser.PostCount = jsonUser.Posts ? jsonUser.Posts.length : 0;
    jsonUser.FollowingCount = jsonUser.Followings ? jsonUser.Followings.length : 0;
    jsonUser.FollowerCount = jsonUser.Followers ? jsonUser.Followers.length : 0;
    return res.json(jsonUser);
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

export default router;
