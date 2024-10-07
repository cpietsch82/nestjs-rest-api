import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { MongooseConfigService } from 'configuration/mongoose.config.service';
import { ConfigModule } from '@nestjs/config';
import baseConfig from '../../configuration/base.config';
import databaseConfig from '../../configuration/database.config';
import { validate } from '../../common/validators/env.validation';

@Module({
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
})
export class HealthModule {}
