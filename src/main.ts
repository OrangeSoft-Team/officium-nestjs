import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './comun/infraestructura/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  app.enableCors({
    origin: [
      configService.get('ORIGIN_VUE'),
      configService.get('ORIGIN_FLUTTER'),
      configService.get('ORIGIN_VAADIN'),
    ],
    credentials: true,
  })
  const port = configService.get('PORT')
  app.use(cookieParser())
  await app.listen(port || '3000')
}
bootstrap()
