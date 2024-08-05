import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './schemas/todo.schema';
import { MongooseConfigService } from '../../configuration/mongoose.config.service';
import { ConfigModule } from '@nestjs/config';
import baseConfig from '../../configuration/base.config';
import databaseConfig from '../../configuration/database.config';
import { validate } from '../../common/validators/env.validaton';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Types } from 'mongoose';

describe('TodosService', () => {
  let service: TodosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: `.env.${process.env.NODE_ENV}`,
          load: [baseConfig, databaseConfig],
          cache: false,
          expandVariables: true,
          validate: validate,
        }),
        MongooseModule.forRootAsync({
          useClass: MongooseConfigService,
        }),
        MongooseModule.forFeatureAsync([
          {
            name: Todo.name,
            useFactory: () => {
              return TodoSchema;
            },
          },
        ]),
      ],
      providers: [TodosService],
    }).compile();

    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a todo', async () => {
      const newTodo = {
        todo: 'this is my first todo',
        tag: 'private',
        done: false,
        done_at: null,
      } as CreateTodoDto;
      const result = await service.create({
        user_id: 'test_user_id',
        ...newTodo,
      });
      expect(result).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should return a list of todos', async () => {
      const userId = new Types.ObjectId();
      const newTodo = {
        todo: 'this is my first todo',
        tag: 'private',
        done: false,
        done_at: null,
      } as CreateTodoDto;
      await service.create({
        user_id: userId,
        ...newTodo,
      });
      const result = await service.findAll(userId, {});
      expect(result).toBeDefined();
      expect(result).not.toBeNaN();
    });
  });
});
