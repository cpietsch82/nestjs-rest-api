import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule } from '@nestjs/config';
import baseConfig from '../../configuration/base.config';
import databaseConfig from '../../configuration/database.config';
import { validate } from '../../common/validators/env.validaton';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from '../../configuration/mongoose.config.service';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TerminusModule.forRoot({
          errorLogStyle: 'pretty',
        }),
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
      ],
      controllers: [HealthController],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
