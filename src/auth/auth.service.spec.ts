import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigType } from '@nestjs/config';
import jwtConfig from '../../configuration/jwt.config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from '../../configuration/mongoose.config.service';
import baseConfig from '../../configuration/base.config';
import databaseConfig from '../../configuration/database.config';
import { validate } from '../../common/validators/env.validation';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { User, UserSchema } from '../../src/users/schemas/user.schema';
import { RegisterDto } from './dto/register.dto';

describe('AuthService', () => {
  let service: AuthService;

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
        ConfigModule.forFeature(jwtConfig),
        UsersModule,
        PassportModule,
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
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user', async () => {
    const newUserData = {
      username: 'fake_user',
      password: 'fake_password',
    } as RegisterDto;
    const result = await service.register(
      newUserData.username,
      newUserData.password,
    );
    expect(result).toHaveProperty('username');
    expect(result.username).toBe(newUserData.username);
  });

  it('should throw an duplicate key error', async () => {
    const newUserData = {
      username: 'fake_user',
      password: 'fake_password',
    } as RegisterDto;
    await service.register(newUserData.username, newUserData.password);
    try {
      await service.register(newUserData.username, newUserData.password);
    } catch (err) {
      expect(err).toBeDefined();
      expect(err.name).toBe('MongoServerError');
      expect(err.code).toBe(11000);
    }
  });
});
