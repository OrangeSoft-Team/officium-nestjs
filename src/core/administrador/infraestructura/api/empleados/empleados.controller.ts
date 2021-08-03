import { Controller, Get, Param } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'
import {
  ApiBasicAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger'
import { IExcepcionAplicacion } from '../../../../../comun/aplicacion/IExcepcionAplicacion'
import { QueryListarEmpleados } from '../../cqrs/queries/ListarEmpleados.query'
import { QueryVerPerfilEmpleado } from '../../cqrs/queries/VerPerfilEmpleado.query'
import { DetalleEmpleadoApiDTO } from '../../dto/DetalleEmpleado.api.dto'
import { ListaEmpleadosApiDTO } from '../../dto/ListaEmpleados.api.dto'
import { EmpleadoApiMapeador } from '../../mapeadores/Empleado.api.mapeador'
import { ErroresHttpEmpleadosAdministrador } from './empleados.errores'

@Controller('api/staff/empleados')
export class ControladorEmpleadosAdministrador {
  public constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiTags('Core/Administrador')
  @ApiOkResponse({
    type: ListaEmpleadosApiDTO,
    isArray: true,
    description: 'Se obtuvo la lista de empleados registrados correctamente.',
  })
  @ApiBasicAuth()
  public async listarEmpleados() {
    const solicitud = await this.queryBus.execute(new QueryListarEmpleados())

    // En caso de error
    if (!solicitud.esExitoso) {
      const excepcion = <IExcepcionAplicacion>solicitud.error
      ErroresHttpEmpleadosAdministrador.manejarExcepcion(excepcion, 'GET')
    }

    // En caso de exito
    return EmpleadoApiMapeador.convertirRespuestaListarEmpleados(
      solicitud.valor,
    )
  }

  @Get('/:uuid_empleado')
  @ApiTags('Core/Administrador')
  @ApiOkResponse({
    type: DetalleEmpleadoApiDTO,
    description: 'Se obtuvo los detalles del empleado correctamente.',
  })
  @ApiParam({
    type: 'string',
    name: 'uuid_empleado',
    example: '241c96aa-c985-42ed-8d21-f29f5b80d6f0',
  })
  @ApiNotFoundResponse({
    description: 'No se ha podido ubicar al empleado especificado.',
  })
  @ApiBasicAuth()
  public async verPerfilEmpleado(@Param('uuid_empleado') idEmpleado: string) {
    const solicitud = await this.queryBus.execute(
      new QueryVerPerfilEmpleado({ idEmpleado }),
    )

    // En caso de error
    if (!solicitud.esExitoso) {
      const excepcion = <IExcepcionAplicacion>solicitud.error
      ErroresHttpEmpleadosAdministrador.manejarExcepcion(excepcion, 'GET')
    }

    // En caso de exito
    return EmpleadoApiMapeador.convertirRespuestaVerPerfilEmpleado(
      solicitud.valor,
    )
  }
}
