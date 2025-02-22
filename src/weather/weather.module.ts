import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { WeatherService } from './weather.service'
import { WeatherController } from './weather.controller'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [WeatherController],
  providers: [WeatherService]
})
export class WeatherModule {}
