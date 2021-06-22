import { NestFactory } from '@nestjs/core'
import { AppModule } from './comun/infraestructura/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(2000)
}
bootstrap()
