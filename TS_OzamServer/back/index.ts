import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import dotenv from 'dotenv';
import passport from 'passport';
import hpp from 'hpp';
import helmet from 'helmet';

import { sequelize } from './models';
import userRouter from './routes/user';
import postRouter from './routes/post';
import postsRouter from './routes/posts';
import hashtagRouter from './routes/hashtag';

dotenv.config();
const app = express();
const prod: boolean = process.env.NODE_ENV === 'production';

app.set('port', prod ? process.env.PORT : 3000);
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err: Error) => {
    console.error(err);
  });

if (prod) {
  app.use(hpp());
  app.use(helmet());
  app.use(morgan('combined'));
  app.use(
    cors({
      origin: /ozam\.shop$/,
      credentials: true,
    })
  );
} else {
  app.use(morgan('dev'));
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
}

app.use('/', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET!, //dotenv 로 값을 넣으면 TS에서 값이 있는지 없는지 확신 못함 !로 알려줘야함 분명히 있다고!!
    cookie: {
      httpOnly: true,
      secure: false, // https -> true
      domain: prod ? '.ozam.shop' : undefined,
    },
    name: 'rnbck',
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/hashtag', hashtagRouter);

app.get('/', (req, res, next) => {
  res.send('ozam-server 정상 동작!');
});

app.listen(app.get('port'), () => {
  console.log(`server is running on ${app.get('port')}`);
});
