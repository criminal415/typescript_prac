import passport from 'passport';
import { isExpressionStatement } from 'typescript';
import User from '../models/user';
import local from './local';

export default () => {
  passport.serializeUser((user: User, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await User.findOne({
        where: { id },
      });
      if (!user) {
        return done(new Error('no user'));
      }
      return done(null, user);
    } catch (err) {
      console.error(err);
      return done(err);
    }
  });

  local();
};
