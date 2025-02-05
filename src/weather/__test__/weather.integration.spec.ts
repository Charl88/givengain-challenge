/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, HttpStatus } from '@nestjs/common'
import * as request from 'supertest'
import { WeatherModule } from '../weather.module'

describe('WeatherController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [WeatherModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterEach(async () => {
    await app.close()
  })

  it('/GET weather/current (no lon)', async () => {
    return request(app.getHttpServer())
      .get('/weather?lat=999')
      .expect(HttpStatus.BAD_REQUEST)
  })

  it('/GET weather/current (no lat)', async () => {
    return request(app.getHttpServer())
      .get('/weather?lon=999')
      .expect(HttpStatus.BAD_REQUEST)
  })

  it('/GET weather/current (no inputs)', async () => {
    return request(app.getHttpServer())
      .get('/weather')
      .expect(HttpStatus.BAD_REQUEST)
  })
})
