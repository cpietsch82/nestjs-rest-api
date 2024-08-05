import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private configService: ConfigService) {}

  async createMongooseOptions(): Promise<MongooseModuleOptions> {
    if (process.env.APP_ENVIRONMENT === 'test') {
      const mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      return {
        uri,
      };
    }
    return {
      uri: this.configService.get<string>('database.mongodb.uri'),
    };
  }
}
