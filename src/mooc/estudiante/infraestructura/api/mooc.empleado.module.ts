import { MiddlewareConsumer, Module } from '@nestjs/common'
import { MiddlewareSesion } from '../../../../comun/infraestructura/middleware/sesion.middleware'
import { ModuloCursos } from './cursos/cursos.module'

@Module({
  imports: [ModuloCursos],
  controllers: [],
})
export class ModuloMoocEmpleado {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(MiddlewareSesion).forRoutes()
  }
}
