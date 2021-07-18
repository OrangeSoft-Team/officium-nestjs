import { Body, Controller, Post } from '@nestjs/common'
import { IExcepcionAplicacion } from '../../../../../comun/aplicacion/IExcepcionAplicacion'
import { ComandoRegistrarEmpleado } from '../../cqrs/comandos/RegistrarEmpleado.comando'
import { DatosRegistroEmpleadoApiDTO } from '../../dto/DatosRegistroEmpleado.api.dto'
import { ErroresHttpRegistroEmpleado } from './registro.errores'
import { ServicioRegistroEmpleado } from './registro.service'

@Controller('api/empleado/registrar')
export class ControladorRegistroEmpleado {
  public constructor(
    private readonly servicioRegistroEmpleado: ServicioRegistroEmpleado,
  ) {}

  @Post()
  public async registrarEmpleado(@Body() dto: DatosRegistroEmpleadoApiDTO) {
    const solicitud = await this.servicioRegistroEmpleado.registrarEmpleado(
      new ComandoRegistrarEmpleado(dto),
    )

    // En caso de error
    if (!solicitud.esExitoso) {
      const excepcion = <IExcepcionAplicacion>solicitud.error
      console.log(excepcion)
      ErroresHttpRegistroEmpleado.manejarExcepcion(excepcion, 'POST')
    }

    // En caso de exito
    return
  }
}
