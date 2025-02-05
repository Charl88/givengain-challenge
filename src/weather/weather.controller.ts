import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { ApiBasicAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { WeatherService } from './weather.service'
import { GetWeatherDto } from './dto/get-weather.dto'

@ApiBasicAuth()
@ApiTags('weather')
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Get weather by latitude and longitude' })
  getWeather(@Query() getWeatherDto: GetWeatherDto) {
    const { lat, lon } = getWeatherDto
    return this.weatherService.getWeather(lat, lon)
  }
}
