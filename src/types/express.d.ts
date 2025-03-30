import { Request } from 'express';

declare module 'express' {
  export interface Request {
    user?: any; // 👈 Add the `user` property
  }
}
