import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  BadRequestException
} from '@nestjs/common'
import { Request, Response } from 'express'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()

    // We'll default to a 500 status code and a generic error message
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    const message =
      exception instanceof HttpException
        ? (exception.getResponse() as { statusCode: number; message: string })
        : { statusCode: 500, message: 'Internal Server Error' }

    if (exception instanceof BadRequestException) {
      // For validation errors we need to return the errors array
      const exceptionResponse = exception.getResponse() as {
        statusCode: number
        message: string
      }
      response.status(status).json({
        statusCode: status,
        message: 'Validation failed',
        errors: exceptionResponse.message
      })
    } else {
      // For all other errors we return the specified message
      response.status(status).json({
        statusCode: message.statusCode,
        message: message.message
      })
    }
  }
}
