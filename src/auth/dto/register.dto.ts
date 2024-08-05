import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty()
  readonly username: string;

  @ApiProperty()
  readonly password: string;
}
