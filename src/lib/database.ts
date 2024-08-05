/**
 *  database seed file
 */

import { Types } from 'mongoose';

export const USERS = [
  {
    _id: new Types.ObjectId('66b097da80529b4926acd149'),
    username: 'DevelopmentUser',
    password_hash:
      '$2b$10$E55CViGUuQMiqurj9qqDjuPpo4p80C5R4Zer11WC21S/6VL0DYU6i',
    __v: 0,
  },
];

export const TODOS = [
  {
    user_id: new Types.ObjectId('66b097da80529b4926acd149'),
    todo: 'My first TODO',
    tag: 'private',
    done: false,
    done_at: null,
  },
  {
    user_id: new Types.ObjectId('66b097da80529b4926acd149'),
    todo: 'Wash my car',
    tag: 'private',
    done: false,
    done_at: null,
  },
  {
    user_id: new Types.ObjectId('66b097da80529b4926acd149'),
    todo: 'Pay my last flat bill',
    tag: 'private',
    done: false,
    done_at: null,
  },
];
