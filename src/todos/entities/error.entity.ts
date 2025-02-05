import { ApiProperty } from '@nestjs/swagger'

export class ApiError {
  @ApiProperty({ example: 400, description: 'The status code of the error' })
  statusCode: number

  @ApiProperty({
    example: 'Validation failed',
    description: 'The message of the error'
  })
  message: string

  @ApiProperty({
    example: ['title should not be empty', 'title must be a string'],
    description: 'The errors array'
  })
  errors: string[]
}
