import { Controller, Get, Param, Post, Body } from '@nestjs/common'
import { ExcepcionAplicacion } from '../../../../comun/aplicacion/ExcepcionAplicacion'
import { CrearOfertaLaboralEmpresaApiDTO } from '../../dto/CrearOfertaLaboralEmpresa.api.dto'
import { AdministradorErrorHttpMapeador } from '../../mapeadores/AdministradorErrorHttp.mapeador'
import { OfertaLaboralAPIMapeador } from '../../mapeadores/OfertaLaboral.api.mapeador'
import { ServicioOfertasLaborales } from './ofertas.service'


/*import { VerDetalleOfertaLaboralRespuestaDTO } from '../../../aplicacion/dto/VerDetalleOfertaLaboral.dto'
import { VerOfertasLaboralesActivasRespuestaDTO } from '../../../aplicacion/dto/VerOfertasLaborales.dto' */

@Controller('api/personal_administrativo/ofertas_laborales')
export class ControladorOfertasLaborales {
  
  public constructor(
    private readonly servicioOfertasLaborales: ServicioOfertasLaborales,
  ) {}


  @Post()
  public async crearOfertaLaboral(
    @Body() dto: CrearOfertaLaboralEmpresaApiDTO,
  ) {
    // Mapeamos el dto de infraestructura al dto de capa de aplicación requerido
    const dtoSolicitud =
      OfertaLaboralAPIMapeador.transformarSolicitudHttpCrearOfertaLaboral(dto)
    // Realizamos la solicitud con el dto mapeado
    const solicitud = await this.servicioOfertasLaborales.crearOfertaLaboralAdministrador(
      dtoSolicitud,
    )
    // En caso de error
    if (!solicitud.esExitoso) {
      const excepcion = <ExcepcionAplicacion>solicitud.error
      AdministradorErrorHttpMapeador.manejarExcepcionEmpleador(excepcion, 'POST')
    }
    // En caso de exito
    return
  }

 /*  @Get(':uuid_empresa')
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
  } */

 /*  @Get(':uuid_empresa/:uuid_oferta_laboral')
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
  } */

  
}
