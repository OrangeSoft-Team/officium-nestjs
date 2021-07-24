import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { IExcepcionAplicacion } from '../../../../../comun/aplicacion/IExcepcionAplicacion'
import { ComandoAgregarExperienciaLaboral } from '../../cqrs/comandos/AgregarExperienciaLaboralEmpleado.comando'
import { ComandoEditarExperienciaLaboral } from '../../cqrs/comandos/EditarExperienciaLaboralEmpleado.comando'
import { ComandoEliminarExperienciaLaboral } from '../../cqrs/comandos/EliminarExperienciaLaboralEmpleado.comando'
import { QueryConsultarExperienciasLaboralesEmpleado } from '../../cqrs/queries/ConsultarExperienciasLaboralesEmpleado.query'
import { ActualizarExperienciaLaboralEmpleadoApiDTO } from '../../dto/ActualizarExperienciaLaboralEmpleado.api.dto'
import { CrearExperienciaLaboralEmpleadoApiDTO } from '../../dto/CrearExperienciaLaboralEmpleado.api.dto'
import { ExperienciaLaboralApiMapeador } from '../../mapeadores/ExperienciaLaboral.api.mapeador'
import { ErroresHttpExperienciasEmpleado } from './experiencias.errores'
import { Auth } from '../../../../../comun/infraestructura/dto/Auth.dto'

@Controller('api/empleado/experiencias_laborales')
export class ControladorExperienciasEmpleado {
  public constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  public async obtenerExperienciasLaborales(@Body() dto: Auth<any>) {
    const solicitud = await this.queryBus.execute(
      new QueryConsultarExperienciasLaboralesEmpleado(dto),
    )

    // En caso de error
    if (!solicitud.esExitoso) {
      const excepcion = <IExcepcionAplicacion>solicitud.error
      ErroresHttpExperienciasEmpleado.manejarExcepcion(excepcion, 'GET')
    }

    // En caso de exito
    return ExperienciaLaboralApiMapeador.convertirRespuestaConsultarExperienciasLaborales(
      solicitud.valor,
    )
  }

  @Post()
  public async crearExperienciaLaboral(
    @Body() dto: Auth<CrearExperienciaLaboralEmpleadoApiDTO>,
  ) {
    const solicitud = await this.commandBus.execute(
      new ComandoAgregarExperienciaLaboral(dto),
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
    @Body() dto: Auth<ActualizarExperienciaLaboralEmpleadoApiDTO>,
    @Param('uuid_experiencia') id: string,
  ) {
    const solicitud = await this.commandBus.execute(
      new ComandoEditarExperienciaLaboral({ ...dto, id }),
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
    @Body() dto: Auth<any>,
    @Param('uuid_experiencia') id: string,
  ) {
    const solicitud = await this.commandBus.execute(
      new ComandoEliminarExperienciaLaboral({ ...dto, id }),
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
