import { IsString, IsNotEmpty, IsBoolean } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateTodoDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The title of the Todo',
    example: 'Buy milk',
    type: String,
    required: true
  })
  title: string

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Whether the Todo is complete',
    example: true,
    type: Boolean,
    required: true
  })
  completed: boolean
}
