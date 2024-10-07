import { plainToInstance } from 'class-transformer';
import { IsEnum, IsString, validateSync } from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  APP_ENVIRONMENT: Environment;
  @IsString()
  JWT_SECRET_KEY: string;
  @IsString()
  JWT_EXPIRES_IN: string;
  @IsString()
  HOST: string;
  @IsString()
  PORT: string;
}

export function validate(config: Record<string, unknown>) {
  // console.log('current config');
  // console.log(config);

  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
