import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AllExceptionsFilter } from './common/filters/exceptions.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalFilters(new AllExceptionsFilter())

  const config = new DocumentBuilder()
    .setTitle('Todo and Weather API')
    .setDescription(
      'An API to manage a Todo list and request weather conditions'
    )
    .setVersion('1.0')
    .addBasicAuth()
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, documentFactory)

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
