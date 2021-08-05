import {  Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { IExcepcionAplicacion } from '../../../../../comun/aplicacion/IExcepcionAplicacion'
import { CrearCursoApiDTO } from '../../dto/CrearCurso.api.dto'
import { ComandoCrearCurso } from '../../cqrs/comandos/CrearCurso.comando'
import { ErroresHttpCursosAdministrador } from './cursos.errores'

@Controller('api/staff/cursos')
export class ControladorCursosTutor {
  public constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,) {}

  @Post()
  public async crearEmpresa(@Body() dto: CrearCursoApiDTO) {
    const solicitud = await this.commandBus.execute(
      new ComandoCrearCurso(dto),
    )

    // En caso de presentar un error error
    if (!solicitud.esExitoso) {
      const excepcion = <IExcepcionAplicacion>solicitud.error
      ErroresHttpCursosAdministrador.manejarExcepcion(excepcion, 'POST')
    }

    // En caso de exito
    return
  }
}
