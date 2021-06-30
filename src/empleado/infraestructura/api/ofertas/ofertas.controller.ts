import { Body, Controller, HttpException, Get } from '@nestjs/common'
import { ServicioOfertasLaborales } from './ofertas.service'
import { EmpleadoErrorHttpMapeador } from '../../mapeadores/EmpleadoErrorHttp.mapeador'
import { ExcepcionAplicacion } from '../../../../comun/aplicacion/ExcepcionAplicacion'
import { ConsultarOfertasLaboralesMapeador } from '../../mapeadores/ConsultarOfertasLaborales.api.mapeador'
import { ConsultarOfertasLaboralesDTO } from 'src/empleado/aplicacion/dto/ConsultarOfertasLaborales.dto'


@Controller('api/empleado/ofertas_laborales')
export class ControladorOfertasLaborales {
  public constructor(
    private readonly servicioOfertasLaborales: ServicioOfertasLaborales,
  ) {}

  @Get()
  public async ConsultarOfertasLaborales() 
  {
    // Realizamos la solicitud al servicio
    const solicitud = await this.servicioOfertasLaborales.ConsultarOfertasLaborales()

    // En caso de error
    if (!solicitud.esExitoso) {
      const excepcion = <ExcepcionAplicacion>solicitud.error
      EmpleadoErrorHttpMapeador.manejarExcepcionEmpleado(excepcion, 'GET')
    }

    //En caso de éxito
    return ConsultarOfertasLaboralesMapeador.respuestaHttp(
      <ConsultarOfertasLaboralesDTO[]>solicitud.valor,
    )
  }
}
