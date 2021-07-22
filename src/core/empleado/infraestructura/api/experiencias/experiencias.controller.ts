import { Body, Controller, Post } from '@nestjs/common'
import { IExcepcionAplicacion } from '../../../../../comun/aplicacion/IExcepcionAplicacion'
import { ComandoAgregarExperienciaLaboral } from '../../cqrs/comandos/AgregarExperienciaLaboralEmpleado.comando'
import { CrearExperienciaLaboralEmpleadoApiDTO } from '../../dto/CrearExperienciaLaboralEmpleado.api.dto'
import { ErroresHttpExperienciasEmpleado } from './experiencias.errores'
import { ServicioApiExperienciasEmpleado } from './experiencias.service'

@Controller('api/empleado/experiencias_laborales')
export class ControladorExperienciasEmpleado {
  public constructor(
    private readonly servicioExperienciasEmpleado: ServicioApiExperienciasEmpleado,
  ) {}

  @Post()
  public async crearExperienciaLaboral(
    @Body() dto: CrearExperienciaLaboralEmpleadoApiDTO,
  ) {
    const solicitud =
      await this.servicioExperienciasEmpleado.crearExperienciaLaboral(
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
}
