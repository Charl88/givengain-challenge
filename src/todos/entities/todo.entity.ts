import { ApiProperty } from '@nestjs/swagger'

export class Todo {
  @ApiProperty({ example: 1, description: 'The id of the Todo' })
  id: number

  @ApiProperty({ example: 'Buy milk', description: 'The title of the Todo' })
  title: string

  @ApiProperty({ example: false, description: 'Whether the Todo is complete' })
  completed: boolean
}
