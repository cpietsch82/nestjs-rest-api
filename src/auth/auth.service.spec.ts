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
import { validate } from '../../common/validators/env.validaton';

describe('AuthService', () => {
  let service: AuthService;

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
        ConfigModule.forFeature(jwtConfig),
        MongooseModule.forRootAsync({
          useClass: MongooseConfigService,
        }),
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
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
