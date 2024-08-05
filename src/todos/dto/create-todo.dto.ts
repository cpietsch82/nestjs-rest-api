import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateTodoDto {
  @ApiProperty({ required: false })
  readonly user_id: Types.ObjectId;

  @ApiProperty()
  readonly todo: string;

  @ApiProperty()
  readonly tag: string;

  @ApiProperty({ description: `is the todo already done`, default: true })
  readonly done: boolean = false;

  @ApiProperty({ description: `when the todo was finished` })
  readonly done_at: Date | null;
}
