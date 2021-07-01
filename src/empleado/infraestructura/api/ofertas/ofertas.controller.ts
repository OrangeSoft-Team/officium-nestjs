import { Controller, Get, Param } from '@nestjs/common'
import { ServicioOfertasLaborales } from './ofertas.service'
import { EmpleadoErrorHttpMapeador } from '../../mapeadores/EmpleadoErrorHttp.mapeador'
import { ExcepcionAplicacion } from '../../../../comun/aplicacion/ExcepcionAplicacion'
import { OfertaLaboralAPIMapeador } from '../../mapeadores/OfertaLaboral.api.mapeador'
import { ConsultarOfertasLaboralesDTO } from '../../../../empleado/aplicacion/dto/ConsultarOfertasLaborales.dto'
import { VerDetallesOfertaLaboralDTO } from '../../../../empleado/aplicacion/dto/VerDetallesOfertaLaboral.dto'

@Controller('api/empleado/ofertas_laborales')
export class ControladorOfertasLaborales {
  public constructor(
    private readonly servicioOfertasLaborales: ServicioOfertasLaborales,
  ) {}

  @Get()
  public async ConsultarOfertasLaborales() {
    // Realizamos la solicitud al servicio
    const solicitud =
      await this.servicioOfertasLaborales.ConsultarOfertasLaborales()

    // En caso de error
    if (!solicitud.esExitoso) {
      const excepcion = <ExcepcionAplicacion>solicitud.error
      EmpleadoErrorHttpMapeador.manejarExcepcionEmpleado(excepcion, 'GET')
    }

    //En caso de éxito
    return OfertaLaboralAPIMapeador.ConsultarOfertasRespuestaHttp(
      <ConsultarOfertasLaboralesDTO[]>solicitud.valor,
    )
  }

  @Get(':uuid_oferta_laboral')
  public async VerDetallesOfertaLaboral(
    @Param('uuid_empresa') uuidEmpresa: string,
  ) {
    //Creamos el DTO de solicitud
    const dto =
      OfertaLaboralAPIMapeador.VerDetallesOfertaPeticionHttp(uuidEmpresa)
    // Realizamos la solicitud al servicio
    const solicitud =
      await this.servicioOfertasLaborales.VerDetallesOfertaLaboral(dto)

    // En caso de error
    if (!solicitud.esExitoso) {
      const excepcion = <ExcepcionAplicacion>solicitud.error
      EmpleadoErrorHttpMapeador.manejarExcepcionEmpleado(excepcion, 'GET')
    }

    //En caso de éxito
    return OfertaLaboralAPIMapeador.VerDetallesOfertaRespuestaHttp(
      <VerDetallesOfertaLaboralDTO>solicitud.valor,
    )
  }
}
