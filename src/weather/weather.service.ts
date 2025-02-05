import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { ConfigService } from '@nestjs/config'
import { lastValueFrom } from 'rxjs'
import { AxiosError } from 'axios'

interface WeatherApiError {
  cod: number
  message: string
}

@Injectable()
export class WeatherService {
  private readonly apiKey: string
  private readonly apiUrl: string

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    this.apiKey = this.configService.get<string>('WEATHER_API_KEY') || ''
    this.apiUrl = this.configService.get<string>('WEATHER_API_URL') || ''
  }

  async getWeather(lat: number, lon: number): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.get(this.apiUrl, {
        params: {
          lat,
          lon,
          appid: this.apiKey,
          units: 'metric'
        }
      })
    )

    return response.data
  }
}
