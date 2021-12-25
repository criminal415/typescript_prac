import * as express from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';
import Image from '../models/image';
import Post from '../models/post';
import User from '../models/user';

import { isLoggedIn } from '../middlewares/middlewares';

const router = express.Router();

router.get('/', isLoggedIn, (req, res) => {
  // /api/user/
  const user = req.user!.toJSON() as User;
  delete user.password;
  return res.json(user);
});

router.post('/', async (req, res, next) => {
  // POST /api/user 회원가입
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

export default router;
