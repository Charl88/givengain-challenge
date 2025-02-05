import { Test, TestingModule } from '@nestjs/testing'
import { TodosController } from '../todos.controller'
import { TodosService } from '../todos.service'
import { NotFoundException, HttpException, HttpStatus } from '@nestjs/common'

describe('TodosController', () => {
  let controller: TodosController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [TodosService]
    }).compile()

    controller = module.get<TodosController>(TodosController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should create a new todo', () => {
    const todo = controller.create({ title: 'Test Todo' })
    expect(todo).toBeDefined()
    expect(todo.title).toBe('Test Todo')
  })

  it('should retrieve all todos', () => {
    controller.create({ title: 'Todo 1' })
    controller.create({ title: 'Todo 2' })
    const todos = controller.findAll()
    expect(todos.length).toBe(2)
  })

  it('should retrieve a single todo by id', () => {
    const todo = controller.create({ title: 'Test Todo' })
    const foundTodo = controller.findOne(todo.id.toString())
    expect(foundTodo).toBeDefined()
    expect(foundTodo.id).toBe(todo.id)
  })

  it('should throw NotFoundException if todo not found', () => {
    expect(() => controller.findOne('999')).toThrow(NotFoundException)
  })

  it('should update a todo', () => {
    const todo = controller.create({ title: 'Test Todo' })
    const updatedTodo = controller.update(todo.id.toString(), {
      title: 'Updated Todo',
      completed: true
    })
    expect(updatedTodo.title).toBe('Updated Todo')
    expect(updatedTodo.completed).toBe(true)
  })

  it('should throw NotFoundException if updating non-existing todo', () => {
    expect(() =>
      controller.update('999', { title: 'Updated Todo', completed: true })
    ).toThrow(NotFoundException)
  })

  it('should remove a todo and return NO_CONTENT', () => {
    const todo = controller.create({ title: 'Test Todo' })
    try {
      controller.remove(todo.id.toString())
    } catch (error: any) {
      expect(error).toBeInstanceOf(HttpException)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      expect(error.getStatus()).toBe(HttpStatus.NO_CONTENT)
    }
    expect(() => controller.findOne(todo.id.toString())).toThrow(
      NotFoundException
    )
  })

  it('should throw NotFoundException if removing non-existing todo', () => {
    expect(() => controller.remove('999')).toThrow(NotFoundException)
  })
})
