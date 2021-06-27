import { Body, Controller, HttpException, Post } from '@nestjs/common'
import { CrearOfertaLaboralEmpresaApiDTO } from '../../dto/CrearOfertaLaboralEmpresa.api.dto'
import { CrearOfertaLaboralAPIMapeador } from '../../mapeadores/CrearOfertaLaboral.api.mapeador'
import { ServicioOfertasLaborales } from './ofertas.service'
import { EmpleadorErrorHttpMapeador } from '../../mapeadores/EmpleadorErrorHttp.mapeador'
import { ExcepcionAplicacion } from '../../../../comun/aplicacion/ExcepcionAplicacion'

@Controller('empleador/ofertas_laborales')
export class ControladorOfertasLaborales {
  public constructor(
    private readonly servicioOfertasLaborales: ServicioOfertasLaborales,
  ) {}

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
      const excepcion: ExcepcionAplicacion = solicitud.error
      const http = EmpleadorErrorHttpMapeador.obtenerCodigoHttp(
        excepcion.getError().nombre,
      )
      throw new HttpException(
        {
          codigo: http,
          nombre: excepcion.getError().nombre,
          error: excepcion.getError().error,
        },
        http,
      )
    }
    // En caso de exito
    return
  }
}
