import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HandlerIniciarSesionEmpresa } from '../../cqrs/handlers/IniciarSesionEmpresa.handler'
import { EmpresaORM } from '../../persistencia/Empresa.orm'
import { ControladorAuthEmpresa } from './auth.controller'

const ManejadoresComandos = [HandlerIniciarSesionEmpresa]

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([EmpresaORM])],
  controllers: [ControladorAuthEmpresa],
  providers: [...ManejadoresComandos],
})
export class ModuloAuthEmpresa {}
