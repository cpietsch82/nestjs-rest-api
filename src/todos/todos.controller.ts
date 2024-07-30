import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiSecurity('bearer')
@ApiTags('todos')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({
    status: 302,
    description: 'Todo already exists.',
  })
  async create(@Body() createTodoDto: CreateTodoDto) {
    return await this.todosService.create(createTodoDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns all available Todos.',
  })
  async findAll() {
    return await this.todosService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Returns a specific Todo.',
  })
  @ApiResponse({
    status: 404,
    description: 'Returns if no Todo was found.',
  })
  async findOne(@Param('id') id: string) {
    return await this.todosService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return await this.todosService.update(id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(id);
  }
}
