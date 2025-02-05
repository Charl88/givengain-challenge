import { IsString, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Buy milk',
    description: 'The title of the Todo',
    required: true
  })
  title: string
}
