import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from '../../configuration/mongoose.config.service';
import { validate } from '../../common/validators/env.validation';
import baseConfig from '../../configuration/base.config';
import databaseConfig from '../../configuration/database.config';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from './users.service';
import { User, UserSchema } from './schemas/user.schema';

describe('UsersController', () => {
  let controller: UsersController;

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
            name: User.name,
            useFactory: () => {
              return UserSchema;
            },
          },
        ]),
      ],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
