import { Body, Controller, Post } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { IExcepcionAplicacion } from '../../../../../comun/aplicacion/IExcepcionAplicacion'
import { ComandoRegistrarEmpleado } from '../../cqrs/comandos/RegistrarEmpleado.comando'
import { DatosRegistroEmpleadoApiDTO } from '../../dto/DatosRegistroEmpleado.api.dto'
import { ErroresHttpRegistroEmpleado } from './registro.errores'

@Controller('api/empleado/registrar')
export class ControladorRegistroEmpleado {
  public constructor(private readonly commandBus: CommandBus) {}

  @Post()
  public async registrarEmpleado(@Body() dto: DatosRegistroEmpleadoApiDTO) {
    const solicitud = await this.commandBus.execute(
      new ComandoRegistrarEmpleado(dto),
    )

    // En caso de error
    if (!solicitud.esExitoso) {
      const excepcion = <IExcepcionAplicacion>solicitud.error
      ErroresHttpRegistroEmpleado.manejarExcepcion(excepcion, 'POST')
    }

    // En caso de exito
    return
  }
}
