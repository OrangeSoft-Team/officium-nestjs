import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HandlerIniciarSesionAdministrador } from '../../cqrs/handlers/IniciarSesionAdministrador.handler'
import { AdministradorORM } from '../../persistencia/Administrador.orm'
import { ControladorAuthAdministrador } from './auth.controller'
import { ServicioApiAuthAdministrador } from './auth.service'

const ManejadoresComandos = [HandlerIniciarSesionAdministrador]

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([AdministradorORM])],
  controllers: [ControladorAuthAdministrador],
  providers: [ServicioApiAuthAdministrador, ...ManejadoresComandos],
})
export class ModuloAuthAdministrador {}
