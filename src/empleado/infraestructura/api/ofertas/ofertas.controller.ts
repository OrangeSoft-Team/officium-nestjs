import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ServicioOfertasLaborales } from './ofertas.service'
import { EmpleadoErrorHttpMapeador } from '../../mapeadores/EmpleadoErrorHttp.mapeador'
import { ExcepcionAplicacion } from '../../../../comun/aplicacion/ExcepcionAplicacion'
import { OfertaLaboralAPIMapeador } from '../../mapeadores/OfertaLaboral.api.mapeador'
import { ConsultarOfertasLaboralesDTO } from '../../../aplicacion/dto/oferta/ConsultarOfertasLaborales.dto'
import { VerDetallesOfertaLaboralDTO } from '../../../aplicacion/dto/oferta/VerDetallesOfertaLaboral.dto'
import { AplicarOfertaLaboralEmpleadoApiDTO } from '../../dto/oferta/AplicarOfertaLaboralEmpleado.api.dto'
import { PostulacionOfertaAPIMapeador } from '../../mapeadores/PostulacionOferta.api.mapeador'

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
    @Param('uuid_oferta_laboral') uuidOferta: string,
  ) {
    //Creamos el DTO de solicitud
    const dto =
      OfertaLaboralAPIMapeador.VerDetallesOfertaPeticionHttp(uuidOferta)
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

  @Post(':uuid_oferta_laboral')
  public async PostularseParaOfertaLaboral(
    @Param('uuid_oferta_laboral') uuidOferta: string,
    @Body() dto: AplicarOfertaLaboralEmpleadoApiDTO,
  ) {
    //Creamos el DTO de solicitud
    const dtoSolicitud =
      PostulacionOfertaAPIMapeador.transformarSolicitudHttpPostularseOferta(
        dto,
        uuidOferta,
      )
    // Realizamos la solicitud al servicio
    const solicitud =
      await this.servicioOfertasLaborales.postularseOfertLaboral(dtoSolicitud)

    // En caso de error
    if (!solicitud.esExitoso) {
      const excepcion = <ExcepcionAplicacion>solicitud.error
      EmpleadoErrorHttpMapeador.manejarExcepcionEmpleado(excepcion, 'POST')
    }

    //En caso de éxito
    return
  }
}
