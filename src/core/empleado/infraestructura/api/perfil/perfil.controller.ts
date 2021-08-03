import { Body, Controller, Get } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'
import {
  ApiBasicAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { IExcepcionAplicacion } from '../../../../../comun/aplicacion/IExcepcionAplicacion'
import { Auth } from '../../../../../comun/infraestructura/dto/Auth.dto'
import { QueryVerPerfilEmpleadoActual } from '../../cqrs/queries/VerPerfilEmpleado.query'
import { VerPerfilEmpleadoApiDTO } from '../../dto/VerPerfilEmpleado.api.dto'
import { EmpleadoApiMapeador } from '../../mapeadores/Empleado.api.mapeador'
import { ErroresHttpPerfilEmpleado } from './perfil.errores'

@Controller('api/empleado/perfil')
export class ControladorPerfilEmpleado {
  public constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiTags('Core/Empleado')
  @ApiBasicAuth()
  @ApiOkResponse({
    type: VerPerfilEmpleadoApiDTO,
    description:
      'Los datos del perfil del empleado se obtuvieron correctamente.',
  })
  @ApiNotFoundResponse({
    description: 'No se ha encontrado al empleado solicitado.',
  })
  public async obtenerPerfil(@Body() dto: Auth<any>) {
    const solicitud = await this.queryBus.execute(
      new QueryVerPerfilEmpleadoActual({ idEmpleado: dto.idUsuario }),
    )

    // En caso de error
    if (!solicitud.esExitoso) {
      const excepcion = <IExcepcionAplicacion>solicitud.error
      ErroresHttpPerfilEmpleado.manejarExcepcion(excepcion, 'GET')
    }

    // En caso de exito
    return EmpleadoApiMapeador.convertirRespuestaVerPerfilEmpleado(
      solicitud.valor,
    )
  }
}
