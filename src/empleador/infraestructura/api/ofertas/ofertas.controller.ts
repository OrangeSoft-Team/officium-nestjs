import { Controller, Get, Param, Post, Body } from '@nestjs/common'
import { ExcepcionAplicacion } from '../../../../comun/aplicacion/ExcepcionAplicacion'
import { VerDetalleOfertaLaboralRespuestaDTO } from '../../../aplicacion/dto/VerDetalleOfertaLaboral.dto'
import { VerOfertasLaboralesActivasRespuestaDTO } from '../../../aplicacion/dto/VerOfertasLaborales.dto'
import { CrearOfertaLaboralEmpresaApiDTO } from '../../dto/CrearOfertaLaboralEmpresa.api.dto'
import { EmpleadorErrorHttpMapeador } from '../../mapeadores/EmpleadorErrorHttp.mapeador'
import { OfertaLaboralAPIMapeador } from '../../mapeadores/OfertaLaboral.api.mapeador'
import { ServicioOfertasLaborales } from './ofertas.service'

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
      OfertaLaboralAPIMapeador.transformarSolicitudHttpVerOfertasLaboralesActivas(
        uuidEmpresa,
      )
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
    return OfertaLaboralAPIMapeador.transformarRespuestaVerOfertasLaboralesActivas(
      <VerOfertasLaboralesActivasRespuestaDTO[]>solicitud.valor,
    )
  }

  @Get(':uuid_empresa/:uuid_oferta_laboral')
  public async obtenerDetalleOfertaLaboral(
    @Param('uuid_empresa') uuidEmpresa: string,
    @Param('uuid_oferta_laboral') uuidOfertaLaboral: string,
  ) {
    // Mapeamos la solicitud al dto del caso de uso de aplicación requerido
    const dtoSolicitud =
      OfertaLaboralAPIMapeador.transformarSolicitudHttpVerDetalleOfertaLaboral(
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
    return OfertaLaboralAPIMapeador.transformarRespuestaVerDetalleOfertaLaboral(
      <VerDetalleOfertaLaboralRespuestaDTO>solicitud.valor,
    )
  }

  @Post()
  public async crearOfertaLaboral(
    @Body() dto: CrearOfertaLaboralEmpresaApiDTO,
  ) {
    // Mapeamos el dto de infraestructura al dto de capa de aplicación requerido
    const dtoSolicitud =
      OfertaLaboralAPIMapeador.transformarSolicitudHttpCrearOfertaLaboral(dto)
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
