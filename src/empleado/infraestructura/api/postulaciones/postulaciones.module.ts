import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostulacionOfertaORM } from '../../../../comun/infraestructura/persistencia/PostulacionOferta.orm'
import { ControladorPostulaciones } from './postulaciones.controller'
import { ServicioPostulaciones } from './postulaciones.service'

@Module({
  imports: [TypeOrmModule.forFeature([PostulacionOfertaORM])],
  controllers: [ControladorPostulaciones],
  providers: [ServicioPostulaciones],
})
export class ModuloPostulaciones {}
