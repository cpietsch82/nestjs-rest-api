import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { QueryParams } from './todos.interfaces';
import { RequestWithUser } from 'src/app.interfaces';
import { Types } from 'mongoose';

@ApiSecurity('bearer')
@ApiTags('todos')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @ApiOperation({ summary: 'create a new todo and save it in the database' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({
    status: 302,
    description: 'Todo already exists.',
  })
  async create(
    @Request() req: RequestWithUser,
    @Body() createTodoDto: CreateTodoDto,
  ) {
    createTodoDto = {
      user_id: new Types.ObjectId(req.user._id),
      ...createTodoDto,
    };
    return await this.todosService.create(createTodoDto);
  }

  @Get()
  @ApiOperation({
    summary: 'returns all available todos and sort or filter by query params',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns all available Todos.',
  })
  async findAll(@Request() req: RequestWithUser, @Query() params: QueryParams) {
    return await this.todosService.findAll(req.user._id, params);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'returns a specfic todo from the database',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns a specific Todo.',
  })
  @ApiResponse({
    status: 404,
    description: 'Returns if no Todo was found.',
  })
  async findOne(@Request() req: RequestWithUser, @Param('id') id: string) {
    return await this.todosService.findOne(req.user._id, id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'updates a specfic todo in the database',
  })
  async update(
    @Request() req: RequestWithUser,
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return await this.todosService.update(req.user._id, id, updateTodoDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'remove a specfic todo from the database',
  })
  remove(@Request() req: RequestWithUser, @Param('id') id: string) {
    return this.todosService.remove(req.user._id, id);
  }
}
