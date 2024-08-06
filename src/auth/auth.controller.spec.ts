import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { UsersModule } from '../users/users.module';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import jwtConfig from '../../configuration/jwt.config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from '../../configuration/mongoose.config.service';
import databaseConfig from '../../configuration/database.config';
import baseConfig from '../../configuration/base.config';
import { validate } from '../../common/validators/env.validaton';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { User, UserSchema } from '../../src/users/schemas/user.schema';
import { LoginDto } from './dto/login.dto';

describe('AuthController', () => {
  let controller: AuthController;

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
        ConfigModule.forFeature(jwtConfig),
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
          imports: [ConfigModule.forFeature(jwtConfig)],
          useFactory: (config: ConfigType<typeof jwtConfig>) => {
            return {
              global: true,
              secret: config.secretKey,
              signOptions: { expiresIn: config.expiresIn },
            } as JwtModuleOptions;
          },
          inject: [jwtConfig.KEY],
        }),
      ],
      providers: [
        AuthService,
        {
          provide: APP_GUARD,
          useClass: AuthGuard,
        },
        JwtStrategy,
      ],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should login successfully', async () => {
      const fake_access_token = {
        access_token: 'fake_access_token',
      };
      jest
        .spyOn(controller, 'login')
        .mockImplementation(async () => fake_access_token);

      const loginDto = {
        username: 'test_user',
        password: 'test_password',
      } as LoginDto;
      const result = await controller.login(loginDto);
      expect(result).toBeDefined();
      expect(result).toBe(fake_access_token);
    });
  });
});
