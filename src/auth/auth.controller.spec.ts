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

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
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
        ConfigModule.forFeature(jwtConfig),
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
      ],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
