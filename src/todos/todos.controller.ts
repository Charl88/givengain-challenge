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
  ValidationPipe,
  BadGatewayException,
  BadRequestException,
  InternalServerErrorException
} from '@nestjs/common'
import {
  ApiBasicAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'
import { TodosService } from './todos.service'
import { Todo } from './entities/todo.entity'
import { CreateTodoDto } from './dto/create-todo.dto'
import { UpdateTodoDto } from './dto/update-todos.dto'

@ApiBasicAuth()
@ApiTags('todos')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  @ApiOperation({ summary: 'Get all Todos' })
  @ApiResponse({
    status: 200,
    description: 'The list of all Todos',
    type: Todo,
    isArray: true
  })
  findAll(): Todo[] {
    return this.todosService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Todo by id' })
  @ApiResponse({
    status: 200,
    description: 'The Todo with the specified ID',
    type: Todo
  })
  findOne(@Param('id') id: string): Todo {
    const todo = this.todosService.findOne(+id)
    if (!todo) throw new NotFoundException(`Todo with ID ${id} not found`)
    return todo
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Create a Todo' })
  @ApiResponse({
    status: 201,
    description: 'The created Todo',
    type: Todo
  })
  create(@Body() createTodoDto: CreateTodoDto): Todo {
    return this.todosService.create(createTodoDto)
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Update a Todo by id' })
  @ApiResponse({
    status: 200,
    description: 'The updated Todo',
    type: Todo
  })
  update(@Param('id') id: string, @Body() body: UpdateTodoDto): Todo {
    const todo = this.todosService.update(+id, body)
    if (!todo) throw new NotFoundException(`Todo with ID ${id} not found`)
    return todo
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Todo by id' })
  @ApiResponse({
    status: 204,
    description: 'The Todo was deleted'
  })
  remove(@Param('id') id: string): void {
    const isDeleted = this.todosService.remove(+id)
    if (!isDeleted) {
      throw new NotFoundException(`Todo with ID ${id} not found`)
    }
    throw new HttpException('No Content', HttpStatus.NO_CONTENT)
  }
}
