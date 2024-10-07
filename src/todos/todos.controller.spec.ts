import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoDocument, TodoSchema } from './schemas/todo.schema';
import { MongooseConfigService } from '../../configuration/mongoose.config.service';
import { validate } from '../../common/validators/env.validation';
import baseConfig from '../../configuration/base.config';
import databaseConfig from '../../configuration/database.config';
import { ConfigModule } from '@nestjs/config';
import { Types, UpdateWriteOpResult } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UserDocument } from 'src/users/schemas/user.schema';
import { RequestWithUser } from 'src/app.interfaces';
import { QueryParams } from './todos.interfaces';
import { UpdateTodoDto } from './dto/update-todo.dto';

describe('TodosController', () => {
  let controller: TodosController;

  const fake_todo_id = new Types.ObjectId();
  const fake_user_id = new Types.ObjectId();
  const requestMock = {
    user: {
      _id: fake_user_id,
      username: 'fake_user',
    } as unknown as UserDocument,
  } as unknown as RequestWithUser;
  const todosMock = [
    {
      _id: fake_todo_id,
      user_id: fake_user_id,
      todo: 'fake todo',
      done: false,
      done_at: null,
    },
  ] as TodoDocument[];
  const queryParams = {} as QueryParams;

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
      controllers: [TodosController],
      providers: [TodosService],
    }).compile();

    controller = module.get<TodosController>(TodosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new todo', async () => {
      const newTodo = {
        todo: 'this is my first todo',
        tag: 'private',
        done: false,
        done_at: null,
      } as CreateTodoDto;

      jest
        .spyOn(controller, 'create')
        .mockImplementation(async () => newTodo as any);

      const result = await controller.create(requestMock, newTodo);
      expect(result).toBeDefined();
      expect(result).toBe(newTodo);
    });
  });

  describe('findAll', () => {
    it('should find all todos from a specific user', async () => {
      jest
        .spyOn(controller, 'findAll')
        .mockImplementation(async () => todosMock);

      const result = await controller.findAll(requestMock, queryParams);
      expect(result).toBeDefined();
      expect(result).toBe(todosMock);
    });
  });

  describe('findOne', () => {
    it('should find one todo from a specific user', async () => {
      jest
        .spyOn(controller, 'findOne')
        .mockImplementation(async () => todosMock[0]);

      const result = await controller.findOne(
        requestMock,
        fake_todo_id.toString(),
      );
      expect(result).toBeDefined();
      expect(result).toBe(todosMock[0]);
    });
  });

  describe('update', () => {
    it('should update a todo from a specific user', async () => {
      const writeResultMock = {} as UpdateWriteOpResult;
      const updateTodoDto: UpdateTodoDto = {
        todo: 'update first todo',
      };

      jest
        .spyOn(controller, 'update')
        .mockImplementation(async () => writeResultMock);

      const result = await controller.update(
        requestMock,
        fake_todo_id.toString(),
        updateTodoDto,
      );
      expect(result).toBeDefined();
      expect(result).toBe(writeResultMock);
    });
  });

  describe('remove', () => {
    it('should remove a todo from a specific user', async () => {
      const removedMock = {
        ok: true,
        n: 0,
        deletedCount: 1,
      } as any;

      jest
        .spyOn(controller, 'remove')
        .mockImplementation(async () => removedMock);

      const result = await controller.remove(
        requestMock,
        fake_todo_id.toString(),
      );
      expect(result).toBeDefined();
      expect(result).toBe(removedMock);
    });
  });
});
