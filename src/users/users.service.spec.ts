import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { MongooseConfigService } from '../../configuration/mongoose.config.service';
import { validate } from '../../common/validators/env.validation';
import baseConfig from '../../configuration/base.config';
import databaseConfig from '../../configuration/database.config';
import { ConfigModule } from '@nestjs/config';

describe('UsersService', () => {
  let service: UsersService;

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
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
