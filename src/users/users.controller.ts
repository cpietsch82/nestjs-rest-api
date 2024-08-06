import { Body, Controller, HttpCode, Put, Request } from '@nestjs/common';
import { ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update.dto';
import { RequestWithUser } from 'src/app.interfaces';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put('update')
  @HttpCode(204)
  @ApiSecurity('bearer')
  @ApiResponse({
    status: 204,
    description: 'Update user entity',
  })
  async updatePassword(
    @Request() req: RequestWithUser,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(req.user._id, updateUserDto);
  }
}
