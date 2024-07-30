import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty()
  readonly todo: string;

  @ApiProperty()
  readonly tag: string;

  @ApiProperty({ description: `is the todo already done`, default: true })
  readonly done: boolean = false;

  @ApiProperty({ description: `when the todo was finished` })
  readonly done_at: Date | null;
}
