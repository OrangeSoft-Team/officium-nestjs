import { MiddlewareConsumer, Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MiddlewareSesion } from '../../../../../comun/infraestructura/middleware/sesion.middleware'
import { HandlerConsultarCertificadosEstudiante } from '../../cqrs/handlers/ConsultarCertificadosEstudiante.handler'
import { HandlerConsultarDetalleCertificado } from '../../cqrs/handlers/ConsultarDetalleCertificado.handler'
import { CursoORM } from '../../persistencia/Curso.orm'
import { ControladorCertificados } from './certificados.controller'

const ManejadoresComandos = []

const ManejadoresQueries = [HandlerConsultarCertificadosEstudiante, HandlerConsultarDetalleCertificado]

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([CursoORM])],
  controllers: [ControladorCertificados],
  providers: [...ManejadoresComandos, ...ManejadoresQueries],
})
export class ModuloCertificados {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(MiddlewareSesion).forRoutes(ControladorCertificados)
  }
}
