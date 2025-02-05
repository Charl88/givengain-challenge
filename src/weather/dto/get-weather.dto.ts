import { IsNumber, IsNotEmpty } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

export class GetWeatherDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 40.7128,
    description: 'The latitude of the location',
    required: true
  })
  lat: number

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: -74.006,
    description: 'The longitude of the location',
    required: true
  })
  lon: number
}
