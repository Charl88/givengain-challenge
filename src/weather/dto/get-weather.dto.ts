import { IsNumber, IsNotEmpty } from 'class-validator'
import { Type } from 'class-transformer'

export class GetWeatherDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  lat: number

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  lon: number
}
