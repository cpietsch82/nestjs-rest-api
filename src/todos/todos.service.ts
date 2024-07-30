import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';
import { Todo, TodoModel } from './schemas/todo.schema';
import { QueryParams } from './todos.interfaces';

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

  async findAll(params: QueryParams) {
    console.log(`This action returns all todos`);
    let todos = [];
    if (params.sort) {
      todos = await this.todoModel
        .find()
        .sort({ [params.sort_by]: params.sort });
    } else {
      todos = await this.todoModel.find();
    }
    if (params.filter) {
      return todos.filter((todo) => todo[params.filter] === params.filter_by);
    }
    return todos;
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
