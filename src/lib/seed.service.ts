import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from '../todos/schemas/todo.schema';
import { User } from '../users/schemas/user.schema';
import { TODOS, USERS } from './database';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Todo.name) private readonly todoModel: Model<Todo>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async seed() {
    console.log('delete existing database documents');
    await this.userModel.deleteMany();
    await this.todoModel.deleteMany();
    console.log('start seeding database...');
    await this.userModel.insertMany(USERS);
    await this.todoModel.insertMany(TODOS);
    console.log('Seed data inserted');
  }
}
