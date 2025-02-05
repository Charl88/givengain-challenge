import { IsString, IsNotEmpty, IsBoolean } from 'class-validator'

export class UpdateTodoDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsBoolean()
  @IsNotEmpty()
  completed: boolean
}
