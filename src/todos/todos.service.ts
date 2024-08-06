import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query, Types } from 'mongoose';
import { Todo, TodoDocument, TodoModel } from './schemas/todo.schema';
import { QueryParams } from './todos.interfaces';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    const existing_todo = await this.todoModel.findOne({
      todo: createTodoDto.todo,
    });
    if (existing_todo) {
      throw new HttpException('Todo already exists.', HttpStatus.FOUND);
    }
    return await this.todoModel.create(createTodoDto);
  }

  async findAll(
    user_id: Types.ObjectId,
    params: QueryParams,
  ): Promise<TodoDocument[]> {
    let sort = {};
    if (params.sort && params.sort_by) {
      sort = { [params.sort_by]: params.sort };
    }
    const todos = await this.todoModel.find({ user_id: user_id }).sort(sort);
    if (params.filter) {
      return todos.filter((todo) => todo[params.filter] === params.filter_by);
    }
    return todos;
  }

  async findOne(user_id: Types.ObjectId, id: string) {
    const existing_todo = await this.todoModel.findOne({
      _id: id,
      user_id: user_id,
    });
    if (existing_todo) {
      return existing_todo;
    }
    throw new HttpException('Todo was not found.', HttpStatus.NOT_FOUND);
  }

  async update(
    user_id: Types.ObjectId,
    id: string,
    updateTodoDto: UpdateTodoDto,
  ) {
    return await this.todoModel.updateOne(
      {
        user_id: user_id,
        _id: id,
      },
      {
        $set: updateTodoDto,
      },
    );
  }

  async remove(
    user_id: Types.ObjectId,
    id: string,
  ): Promise<
    Query<{ ok?: number; n?: number; deletedCount?: number }, TodoModel>
  > {
    console.log(`This action removes a #${id} todo`);
    return await this.todoModel.deleteOne({ user_id: user_id, _id: id });
  }
}
