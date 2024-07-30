import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;
}

export interface UserMethods {}
export interface UserStatics {}

export type UserDocument = HydratedDocument<User> & UserMethods;

export type UserModel = Model<UserDocument> & UserStatics;

export const UserSchema = SchemaFactory.createForClass(User);
