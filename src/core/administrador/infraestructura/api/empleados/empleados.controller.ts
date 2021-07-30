import { Controller, Get } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'
import { IExcepcionAplicacion } from '../../../../../comun/aplicacion/IExcepcionAplicacion'
import { QueryListarEmpleados } from '../../cqrs/queries/ListarEmpleados.query'
import { EmpleadoApiMapeador } from '../../mapeadores/Empleado.api.mapeador'
import { ErroresHttpEmpleadosAdministrador } from './empleados.errores'

@Controller('api/staff/empleados')
export class ControladorEmpleadosAdministrador {
  public constructor(private readonly queryBus: QueryBus) {}

  @Get()
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
}
