import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { CrearOfertaLaboralEmpresaApiDTO } from '../../dto/CrearOfertaLaboralEmpresa.api.dto'
import { CrearOfertaLaboralAPIMapeador } from '../../mapeadores/CrearOfertaLaboral.api.mapeador'
import { ServicioOfertasLaborales } from './ofertas.service'
import { EmpleadorErrorHttpMapeador } from '../../mapeadores/EmpleadorErrorHttp.mapeador'
import { VerOfertasLaboralesActivasAPIMapeador } from '../../mapeadores/VerOfertasLaboralesActivas.api.mapeador'
import { VerOfertasLaboralesActivasRespuestaDTO } from '../../../aplicacion/dto/VerOfertasLaborales.dto'
import { ExcepcionAplicacion } from '../../../../comun/aplicacion/ExcepcionAplicacion'
import { VerDetalleOfertaLaboralRespuestaDTO } from '../../../aplicacion/dto/VerDetalleOfertaLaboral.dto'
import { VerDetalleOfertaLaboralAPIMapeador } from '../../mapeadores/VerDetalleOfertaLaboral.api.mapeador'

@Controller('api/empleador/ofertas_laborales')
export class ControladorOfertasLaborales {
  public constructor(
    private readonly servicioOfertasLaborales: ServicioOfertasLaborales,
  ) {}

  @Get(':uuid_empresa')
  public async obtenerOfertasLaboralesActivas(
    @Param('uuid_empresa') uuidEmpresa: string,
  ) {
    // Mapeamos la solicitud al dto del caso de uso de aplicación requerido
    const dtoSolicitud =
      VerOfertasLaboralesActivasAPIMapeador.httpSolicitud(uuidEmpresa)
    // Realizamos la solicitud con el dto mapeado
    const solicitud =
      await this.servicioOfertasLaborales.obtenerOfertasLaboralesActivas(
        dtoSolicitud,
      )

    // En caso de error
    if (!solicitud.esExitoso) {
      const excepcion = <ExcepcionAplicacion>solicitud.error
      EmpleadorErrorHttpMapeador.manejarExcepcionEmpleador(excepcion, 'GET')
    }

    // En caso de exito mapeamos la respuesta del servicio al dto definido por la API y retornamos la data
    return VerOfertasLaboralesActivasAPIMapeador.respuestaHttp(
      <VerOfertasLaboralesActivasRespuestaDTO[]>solicitud.valor,
    )
  }

  @Get(':uuid_empresa/:uuid_oferta_laboral')
  public async obtenerDetalleOfertaLaboral(
    @Param('uuid_empresa') uuidEmpresa: string,
    @Param('uuid_oferta_laboral') uuidOfertaLaboral: string,
  ) {
    // Mapeamos la solicitud al dto del caso de uso de aplicación requerido
    const dtoSolicitud = VerDetalleOfertaLaboralAPIMapeador.httpSolicitud(
      uuidEmpresa,
      uuidOfertaLaboral,
    )

    // Realizamos la solicitud con el dto mapeado
    const solicitud =
      await this.servicioOfertasLaborales.verDetalleOfertaLaboral(dtoSolicitud)

    // En caso de error
    if (!solicitud.esExitoso) {
      const excepcion = <ExcepcionAplicacion>solicitud.error
      EmpleadorErrorHttpMapeador.manejarExcepcionEmpleador(excepcion, 'GET')
    }

    // En caso de exito mapeamos la respuesta del servicio al dto definido por la API y retornamos la data
    return VerDetalleOfertaLaboralAPIMapeador.respuestaHttp(
      <VerDetalleOfertaLaboralRespuestaDTO>solicitud.valor,
    )
  }

  @Post()
  public async crearOfertaLaboral(
    @Body() dto: CrearOfertaLaboralEmpresaApiDTO,
  ) {
    // Mapeamos el dto de infraestructura al dto de capa de aplicación requerido
    const dtoSolicitud = CrearOfertaLaboralAPIMapeador.httpSolicitud(dto)
    // Realizamos la solicitud con el dto mapeado
    const solicitud = await this.servicioOfertasLaborales.crearOfertaLaboral(
      dtoSolicitud,
    )
    // En caso de error
    if (!solicitud.esExitoso) {
      const excepcion = <ExcepcionAplicacion>solicitud.error
      EmpleadorErrorHttpMapeador.manejarExcepcionEmpleador(excepcion, 'POST')
    }
    // En caso de exito
    return
  }
}
