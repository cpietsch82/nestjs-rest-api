import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password_hash: string;

  @Prop({ required: false })
  token: string;
}
export interface SerializedUser {
  _id: Types.ObjectId;
  username: string;
}
export interface UserMethods {
  serialized(): SerializedUser;
}
export interface UserStatics {}

export type UserDocument = HydratedDocument<User> & UserMethods;

export type UserModel = Model<UserDocument> & UserStatics;

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.serialized = (): SerializedUser => {
  return {
    _id: new Types.ObjectId(),
    username: 'TestUser',
  };
};
