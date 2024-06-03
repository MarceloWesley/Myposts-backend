import 'express-session';
import { Session } from 'express-session';

declare module 'express-session' {
  interface SessionData extends Session {
    token: string;
  }
}
