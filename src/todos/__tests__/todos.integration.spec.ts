/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, HttpStatus } from '@nestjs/common'
import * as request from 'supertest'
import { TodosModule } from '../todos.module'
import { CreateTodoDto } from '../dto/create-todo.dto'
import { UpdateTodoDto } from '../dto/update-todos.dto'

describe('TodosController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TodosModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterEach(async () => {
    await app.close()
  })

  it('/POST todos (valid data)', async () => {
    const createTodoDto: CreateTodoDto = { title: 'Test Todo' }
    return request(app.getHttpServer())
      .post('/todos')
      .send(createTodoDto)
      .expect(HttpStatus.CREATED)
      .expect((res: request.Response) => {
        expect(res.body).toHaveProperty('id')
        expect(res.body.title).toBe('Test Todo')
      })
  })

  it('/POST todos (invalid data)', async () => {
    const createTodoDto: CreateTodoDto = { title: '' }
    return request(app.getHttpServer())
      .post('/todos')
      .send(createTodoDto)
      .expect(HttpStatus.BAD_REQUEST)
  })

  it('/GET todos', async () => {
    await request(app.getHttpServer())
      .post('/todos')
      .send({ title: 'Todo 1' })
      .expect(HttpStatus.CREATED)

    await request(app.getHttpServer())
      .post('/todos')
      .send({ title: 'Todo 2' })
      .expect(HttpStatus.CREATED)

    return request(app.getHttpServer())
      .get('/todos')
      .expect(HttpStatus.OK)
      .expect((res: request.Response) => {
        expect((res.body as Array<{ title: string }>).length).toBe(2)
        expect(res.body[0].title).toBe('Todo 1')
        expect(res.body[1].title).toBe('Todo 2')
      })
  })

  it('/GET todos/:id (existing todo)', async () => {
    const res = await request(app.getHttpServer())
      .post('/todos')
      .send({ title: 'Test Todo' })
      .expect(HttpStatus.CREATED)

    const todoId: number = res.body.id

    return request(app.getHttpServer())
      .get(`/todos/${todoId}`)
      .expect(HttpStatus.OK)
      .expect((res: request.Response) => {
        expect(res.body).toHaveProperty('id')
        expect(res.body.title).toBe('Test Todo')
      })
  })

  it('/GET todos/:id (non-existing todo)', async () => {
    return request(app.getHttpServer())
      .get('/todos/999')
      .expect(HttpStatus.NOT_FOUND)
  })

  it('/PUT todos/:id (valid data)', async () => {
    const res = await request(app.getHttpServer())
      .post('/todos')
      .send({ title: 'Test Todo' })
      .expect(HttpStatus.CREATED)

    const todoId: number = res.body.id
    const updateTodoDto: UpdateTodoDto = {
      title: 'Updated Todo',
      completed: true
    }

    return request(app.getHttpServer())
      .put(`/todos/${todoId}`)
      .send(updateTodoDto)
      .expect(HttpStatus.OK)
      .expect((res: request.Response) => {
        expect(res.body.title).toBe('Updated Todo')
        expect(res.body.completed).toBe(true)
      })
  })

  it('/PUT todos/:id (invalid data)', async () => {
    const res = await request(app.getHttpServer())
      .post('/todos')
      .send({ title: 'Test Todo' })
      .expect(HttpStatus.CREATED)

    const todoId: number = res.body.id
    const updateTodoDto: UpdateTodoDto = { title: '', completed: true }

    return request(app.getHttpServer())
      .put(`/todos/${todoId}`)
      .send(updateTodoDto)
      .expect(HttpStatus.BAD_REQUEST)
  })

  it('/DELETE todos/:id (existing todo)', async () => {
    const res = await request(app.getHttpServer())
      .post('/todos')
      .send({ title: 'Test Todo' })
      .expect(HttpStatus.CREATED)

    const todoId: number = res.body.id

    return request(app.getHttpServer())
      .delete(`/todos/${todoId}`)
      .expect(HttpStatus.NO_CONTENT)
  })

  it('/DELETE todos/:id (non-existing todo)', async () => {
    return request(app.getHttpServer())
      .delete('/todos/999')
      .expect(HttpStatus.NOT_FOUND)
  })
})
