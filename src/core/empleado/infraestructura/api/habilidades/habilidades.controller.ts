import { Body, Controller, Get, Put } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import {
  ApiBadRequestResponse,
  ApiBasicAuth,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { IExcepcionAplicacion } from '../../../../../comun/aplicacion/IExcepcionAplicacion'
import { Auth } from '../../../../../comun/infraestructura/dto/Auth.dto'
import { ComandoActualizarHabilidadesEmpleado } from '../../cqrs/comandos/ActualizarHabilidadesEmpleado.comando'
import { QueryConsultarHabilidadesEmpleado } from '../../cqrs/queries/ConsultarHabilidadesEmpleado.query'
import { ActualizarHabilidadesEmpleadoApiDTO } from '../../dto/ActualizarHabilidadesEmpleado.api.dto'
import { HabilidadesEmpleadoApiDTO } from '../../dto/HabilidadesEmpleado.api.dto'
import { HabilidadApiMapeador } from '../../mapeadores/Habilidad.api.mapeador'
import { ErroresHttpHabilidadesEmpleado } from './habilidades.errores'

@Controller('api/empleado/habilidades')
export class ControladorHabilidadesEmpleado {
  public constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Put()
  @ApiTags('Core/Empleado')
  @ApiOkResponse({
    description: 'Las habilidades del empleado se actualizaron correctamente.',
  })
  @ApiNotFoundResponse({
    description: 'No se ha encontrado al empleado.',
  })
  @ApiBadRequestResponse({
    description: 'Algún identificador especificado es invalido.',
  })
  @ApiBody({ type: ActualizarHabilidadesEmpleadoApiDTO })
  @ApiBasicAuth()
  public async actualizarHabilidadesEmpleado(
    @Body() dto: Auth<ActualizarHabilidadesEmpleadoApiDTO>,
  ) {
    const solicitud = await this.commandBus.execute(
      new ComandoActualizarHabilidadesEmpleado(dto),
    )

    // En caso de error
    if (!solicitud.esExitoso) {
      const excepcion = <IExcepcionAplicacion>solicitud.error
      ErroresHttpHabilidadesEmpleado.manejarExcepcion(excepcion, 'PUT')
    }

    // En caso de exito
    return
  }

  @Get()
  @ApiTags('Core/Empleado')
  @ApiBasicAuth()
  @ApiOkResponse({
    description: 'Se han obtenido las habilidades del empleado correctamente.',
    type: HabilidadesEmpleadoApiDTO,
  })
  @ApiNotFoundResponse({
    description: 'No se ha encontrado al empleado.',
  })
  public async obtenerHabilidadesEmpleado(@Body() dto: Auth<any>) {
    const solicitud = await this.queryBus.execute(
      new QueryConsultarHabilidadesEmpleado(dto),
    )

    // En caso de error
    if (!solicitud.esExitoso) {
      const excepcion = <IExcepcionAplicacion>solicitud.error
      ErroresHttpHabilidadesEmpleado.manejarExcepcion(excepcion, 'GET')
    }

    // En caso de exito
    return HabilidadApiMapeador.convertirRespuestaConsultarHabilidades(
      solicitud.valor,
    )
  }
}
