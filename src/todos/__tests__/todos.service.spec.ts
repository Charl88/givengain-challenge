import { Test, TestingModule } from '@nestjs/testing'
import { TodosService } from '../todos.service'

describe('TodosService', () => {
  let service: TodosService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodosService]
    }).compile()

    service = module.get<TodosService>(TodosService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create a new todo', () => {
    const todo = service.create({ title: 'Test Todo' })
    expect(todo).toBeDefined()
    expect(todo.title).toBe('Test Todo')
  })

  it('should retrieve all todos', () => {
    service.create({ title: 'Test Todo 1' })
    service.create({ title: 'Test Todo 2' })
    const todos = service.findAll()
    expect(todos.length).toBe(2)
  })

  it('should retrieve a single todo by id', () => {
    const todo = service.create({ title: 'Test Todo' })
    const foundTodo = service.findOne(todo.id)
    expect(foundTodo).toBeDefined()
    expect(foundTodo?.id).toBe(todo.id)
  })

  it('should return undefined if todo not found', () => {
    const foundTodo = service.findOne(999)
    expect(foundTodo).toBeUndefined()
  })

  it('should update a todo', () => {
    const todo = service.create({ title: 'Test Todo' })
    const updatedTodo = service.update(todo.id, {
      title: 'Updated Todo',
      completed: true
    })
    expect(updatedTodo?.title).toBe('Updated Todo')
    expect(updatedTodo?.completed).toBe(true)
  })

  it('should return undefined if updating non-existing todo', () => {
    const updatedTodo = service.update(999, {
      title: 'Updated Todo',
      completed: true
    })
    expect(updatedTodo).toBeUndefined()
  })

  it('should remove a todo', () => {
    const todo = service.create({ title: 'Test Todo' })
    const isDeleted = service.remove(todo.id)
    expect(isDeleted).toBe(true)
    const foundTodo = service.findOne(todo.id)
    expect(foundTodo).toBeUndefined()
  })

  it('should return false if removing non-existing todo', () => {
    const isDeleted = service.remove(999)
    expect(isDeleted).toBe(false)
  })
})
