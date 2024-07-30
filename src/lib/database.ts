/**
 *  database seed file
 */

import { Types } from 'mongoose';

export const TODOS = [
  {
    todo: 'Mein 1. TODO in der Liste',
    tag: 'privat',
    done: false,
    done_at: null,
  },
  {
    todo: 'Einkaufen',
    tag: 'privat',
    done: false,
    done_at: null,
  },
  {
    todo: 'Bewerbungen schreiben',
    tag: 'privat',
    done: false,
    done_at: null,
  },
];

export const USERS = [
  {
    userId: new Types.ObjectId(),
    username: 'john',
    password: 'changeme',
  },
  {
    userId: new Types.ObjectId(),
    username: 'maria',
    password: 'guess',
  },
];
