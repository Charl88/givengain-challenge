import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TodosModule } from './todos/todos.module'
import { WeatherModule } from './weather/weather.module'
import { AuthGuard } from './auth/auth.guard'

@Module({
  imports: [ConfigModule.forRoot(), TodosModule, WeatherModule],
  providers: [{ provide: 'APP_GUARD', useClass: AuthGuard }]
})
export class AppModule {}
