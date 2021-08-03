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
import {
  ApiBadRequestResponse,
  ApiBasicAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger'
import { ExperienciasLaboralesEmpleadoApiDTO } from '../../dto/ExperienciasLaboralesEmpleado.api.dto'

@Controller('api/empleado/experiencias_laborales')
export class ControladorExperienciasEmpleado {
  public constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiTags('Core/Empleado')
  @ApiOkResponse({
    description:
      'Se han obtenido las experiencias laborales del empleado correctamente.',
    type: ExperienciasLaboralesEmpleadoApiDTO,
  })
  @ApiNotFoundResponse({
    description: 'No se ha podido encontrar al empleado.',
  })
  @ApiBasicAuth()
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
  @ApiTags('Core/Empleado')
  @ApiCreatedResponse({
    description:
      'Se ha creado la experiencia laboral del empleado correctamente.',
  })
  @ApiNotFoundResponse({
    description: 'No se ha podido encontrar al empleado.',
  })
  @ApiBadRequestResponse({
    description:
      'Algún dato especificado de la experiencia laboral es invalido.',
  })
  @ApiBody({
    type: CrearExperienciaLaboralEmpleadoApiDTO,
  })
  @ApiBasicAuth()
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
  @ApiTags('Core/Empleado')
  @ApiOkResponse({
    description:
      'Se ha actualizado la experiencia laboral del empleado correctamente.',
  })
  @ApiNotFoundResponse({
    description:
      'No se ha podido encontrar al empleado o la experiencia laboral.',
  })
  @ApiBadRequestResponse({
    description:
      'Algún dato especificado de la experiencia laboral es invalido.',
  })
  @ApiBody({ type: ActualizarExperienciaLaboralEmpleadoApiDTO })
  @ApiParam({
    name: 'uuid_experiencia',
    type: 'string',
    example: '5e4c28fc-b6f6-4db4-b0ad-e53e48a9390a',
  })
  @ApiBasicAuth()
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
  @ApiTags('Core/Empleado')
  @ApiTags('Core/Empleado')
  @ApiOkResponse({
    description:
      'Se ha eliminado la experiencia laboral del empleado correctamente.',
  })
  @ApiNotFoundResponse({
    description:
      'No se ha podido encontrar al empleado o la experiencia laboral.',
  })
  @ApiParam({
    name: 'uuid_experiencia',
    type: 'string',
    example: '5e4c28fc-b6f6-4db4-b0ad-e53e48a9390a',
  })
  @ApiBasicAuth()
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
