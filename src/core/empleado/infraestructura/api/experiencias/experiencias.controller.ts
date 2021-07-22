import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { IExcepcionAplicacion } from '../../../../../comun/aplicacion/IExcepcionAplicacion'
import { ComandoAgregarExperienciaLaboral } from '../../cqrs/comandos/AgregarExperienciaLaboralEmpleado.comando'
import { ComandoEditarExperienciaLaboral } from '../../cqrs/comandos/EditarExperienciaLaboralEmpleado.comando'
import { ComandoEliminarExperienciaLaboral } from '../../cqrs/comandos/EliminarExperienciaLaboralEmpleado.comando'
import { QueryConsultarExperienciasLaboralesEmpleado } from '../../cqrs/queries/ConsultarExperienciasLaboralesEmpleado.query'
import { ActualizarExperienciaLaboralEmpleadoApiDTO } from '../../dto/ActualizarExperienciaLaboralEmpleado.api.dto'
import { CrearExperienciaLaboralEmpleadoApiDTO } from '../../dto/CrearExperienciaLaboralEmpleado.api.dto'
import { ExperienciasLaboralesEmpleadoApiDTO } from '../../dto/ExperienciasLaboralesEmpleado.api.dto'
import { ErroresHttpExperienciasEmpleado } from './experiencias.errores'

@Controller('api/empleado/experiencias_laborales')
export class ControladorExperienciasEmpleado {
  public constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  public async obtenerExperienciasLaborales(@Body() dto: any) {
    const datos = {
      idUsuario: dto.idUsuario as string,
    }

    const solicitud = await this.queryBus.execute(
      new QueryConsultarExperienciasLaboralesEmpleado(datos),
    )

    // En caso de error
    if (!solicitud.esExitoso) {
      const excepcion = <IExcepcionAplicacion>solicitud.error
      ErroresHttpExperienciasEmpleado.manejarExcepcion(excepcion, 'GET')
    }

    // En caso de exito
    return solicitud.valor as ExperienciasLaboralesEmpleadoApiDTO
  }

  @Post()
  public async crearExperienciaLaboral(
    @Body() dto: CrearExperienciaLaboralEmpleadoApiDTO,
  ) {
    const datos = dto as CrearExperienciaLaboralEmpleadoApiDTO & {
      idUsuario: string
    }

    const solicitud = await this.commandBus.execute(
      new ComandoAgregarExperienciaLaboral(datos),
    )

    // En caso de error
    if (!solicitud.esExitoso) {
      const excepcion = <IExcepcionAplicacion>solicitud.error
      ErroresHttpExperienciasEmpleado.manejarExcepcion(excepcion, 'POST')
    }

    // En caso de exito
    return
  }

  @Put('/:uuid_experiencia')
  public async editarExperienciaLaboral(
    @Body() dto: ActualizarExperienciaLaboralEmpleadoApiDTO,
    @Param('uuid_experiencia') id: string,
  ) {
    const datos = dto as ActualizarExperienciaLaboralEmpleadoApiDTO & {
      id: string
      idUsuario: string
    }
    datos.id = id

    const solicitud = await this.commandBus.execute(
      new ComandoEditarExperienciaLaboral(datos),
    )

    // En caso de error
    if (!solicitud.esExitoso) {
      const excepcion = <IExcepcionAplicacion>solicitud.error
      ErroresHttpExperienciasEmpleado.manejarExcepcion(excepcion, 'PUT')
    }

    // En caso de exito
    return
  }

  @Delete('/:uuid_experiencia')
  public async eliminarExperienciaLaboral(
    @Body() dto: any,
    @Param('uuid_experiencia') id: string,
  ) {
    const datos = {
      id,
      idUsuario: dto.idUsuario as string,
    }

    const solicitud = await this.commandBus.execute(
      new ComandoEliminarExperienciaLaboral(datos),
    )

    // En caso de error
    if (!solicitud.esExitoso) {
      const excepcion = <IExcepcionAplicacion>solicitud.error
      ErroresHttpExperienciasEmpleado.manejarExcepcion(excepcion, 'DELETE')
    }

    // En caso de exito
    return
  }
}
