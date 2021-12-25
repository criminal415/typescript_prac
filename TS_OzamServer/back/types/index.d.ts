import User from '../models/user';
import IUser from '../models/user';
declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
  }
}
declare global {
  namespace Express {
    export interface User extends IUser {}
  }
}
