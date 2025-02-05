import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { WeatherService } from './weather.service'
import { GetWeatherDto } from './dto/get-weather.dto'

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  getWeather(@Query() getWeatherDto: GetWeatherDto) {
    const { lat, lon } = getWeatherDto
    return this.weatherService.getWeather(lat, lon)
  }
}
