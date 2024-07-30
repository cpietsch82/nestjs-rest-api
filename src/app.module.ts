import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from '../common/middleware/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
import baseConfig from '../configuration/base.config';
import databaseConfig from '../configuration/database.config';
import { validate } from '../common/validators/env.validaton';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from '../configuration/mongoose.config.service';
import { SeedService } from '../src/lib/seed.service';
import { User, UserSchema } from './users/schemas/user.schema';
import { Todo, TodoSchema } from './todos/schemas/todo.schema';

@Module({
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
        name: User.name,
        useFactory: () => {
          return UserSchema;
        },
      },
      {
        name: Todo.name,
        useFactory: () => {
          return TodoSchema;
        },
      },
    ]),
    AuthModule,
    UsersModule,
    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeedService],
  exports: [SeedService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('todos');
  }
}
