import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Todo {
  @Prop({ required: true })
  user_id: Types.ObjectId;

  @Prop({ required: true })
  todo: string;

  @Prop()
  tag: string;

  @Prop({ required: true, default: false })
  done: boolean;

  @Prop()
  done_at: Date | null;
}

export interface TodoStatics {}
export interface TodoMethods {}

export type TodoDocument = HydratedDocument<Todo> & TodoMethods;

export type TodoModel = Model<TodoDocument> & TodoStatics;

export const TodoSchema = SchemaFactory.createForClass(Todo);
