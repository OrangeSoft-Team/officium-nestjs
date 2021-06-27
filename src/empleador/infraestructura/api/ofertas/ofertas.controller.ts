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
    const dtoSolicitud = CrearOfertaLaboralAPIMapeador.httpSolicitud(dto)
    const solicitud = await this.servicioOfertasLaborales.crearOfertaLaboral(
      dtoSolicitud,
    )
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

    return solicitud
  }
}
