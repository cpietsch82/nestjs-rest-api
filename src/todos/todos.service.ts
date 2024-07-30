import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';
import { Todo, TodoModel } from './schemas/todo.schema';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    console.log('This action adds a new todo');
    const existing_todo = await this.todoModel.findOne({
      todo: createTodoDto.todo,
    });
    if (existing_todo) {
      throw new HttpException('Todo already exists.', HttpStatus.FOUND);
    }
    return await this.todoModel.create(createTodoDto);
  }

  async findAll() {
    console.log(`This action returns all todos`);
    return await this.todoModel.find();
  }

  async findOne(id: string) {
    console.log(`This action returns a #${id} todo`);
    const existing_todo = await this.todoModel.findById(id);
    if (existing_todo) {
      return existing_todo;
    }
    throw new HttpException('Todo was not found.', HttpStatus.NOT_FOUND);
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    console.log(`This action updates a #${id} todo`);
    return await this.todoModel.updateOne(
      {
        _id: id,
      },
      {
        $set: updateTodoDto,
      },
    );
  }

  async remove(
    id: string,
  ): Promise<
    Query<{ ok?: number; n?: number; deletedCount?: number }, TodoModel>
  > {
    console.log(`This action removes a #${id} todo`);
    return await this.todoModel.deleteOne({ _id: id });
  }
}
