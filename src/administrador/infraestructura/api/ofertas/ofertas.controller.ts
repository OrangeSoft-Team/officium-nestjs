import { Controller, Get, Param, Post, Body } from '@nestjs/common'
import { ExcepcionAplicacion } from '../../../../comun/aplicacion/ExcepcionAplicacion'
import { CrearOfertaLaboralEmpresaAdministradorApiDTO } from '../../dto/CrearOfertaLaboralEmpresaAdministrador.api.dto'
import { AdministradorErrorHttpMapeador } from '../../mapeadores/AdministradorErrorHttp.mapeador'
import { OfertaLaboralAPIMapeador } from '../../mapeadores/OfertaLaboral.api.mapeador'
import { ServicioOfertasLaborales } from './ofertas.service'
import { ConsultarOfertasLaboralesAdministradorDTO } from '../../../aplicacion/dto/ConsultarOfertasLaboralesAdministrador.dto'
/*import { VerDetalleOfertaLaboralRespuestaDTO } from '../../../aplicacion/dto/VerDetalleOfertaLaboral.dto'
  import { VerOfertasLaboralesActivasRespuestaDTO } from '../../../aplicacion/dto/VerOfertasLaborales.dto' 
*/

@Controller('api/personal_administrativo/ofertas_laborales')
export class ControladorOfertasLaborales {
  
  public constructor(
    private readonly servicioOfertasLaborales: ServicioOfertasLaborales,
  ) {}


  @Post()
  public async crearOfertaLaboral(
    @Body() dto: CrearOfertaLaboralEmpresaAdministradorApiDTO,
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
      AdministradorErrorHttpMapeador.manejarExcepcionAdministrador(excepcion, 'POST')
    }
    // En caso de exito
    return
  }

  @Get()
  public async ConsultarOfertasLaborales() {
    // Realizamos la solicitud al servicio
    const solicitud =
      await this.servicioOfertasLaborales.ConsultarOfertasLaboralesAdministrador()

    // En caso de error
    if (!solicitud.esExitoso) {
      const excepcion = <ExcepcionAplicacion>solicitud.error
      AdministradorErrorHttpMapeador.manejarExcepcionAdministrador(excepcion, 'GET')
    }

    //En caso de éxito
    return OfertaLaboralAPIMapeador.ConsultarOfertasRespuestaHttp(
      <ConsultarOfertasLaboralesAdministradorDTO[]>solicitud.valor,
    )
  }  
}
