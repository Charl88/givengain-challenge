import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { TodosService, Todo } from './todos.service'
import { CreateTodoDto } from './dto/create-todo.dto'
import { UpdateTodoDto } from './dto/update-todos.dto'

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  findAll(): Todo[] {
    return this.todosService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Todo {
    const todo = this.todosService.findOne(+id)
    if (!todo) throw new NotFoundException(`Todo with ID ${id} not found`)
    return todo
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() body: CreateTodoDto): Todo {
    return this.todosService.create(body)
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(@Param('id') id: string, @Body() body: UpdateTodoDto): Todo {
    const todo = this.todosService.update(+id, body)
    if (!todo) throw new NotFoundException(`Todo with ID ${id} not found`)
    return todo
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    const isDeleted = this.todosService.remove(+id)
    if (!isDeleted) {
      throw new NotFoundException(`Todo with ID ${id} not found`)
    }
    throw new HttpException('No Content', HttpStatus.NO_CONTENT)
  }
}
