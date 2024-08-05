import { Request as ExpressRequest } from 'express';
import { UserDocument } from './users/schemas/user.schema';

export interface RequestWithUser extends ExpressRequest {
  user: UserDocument;
}
