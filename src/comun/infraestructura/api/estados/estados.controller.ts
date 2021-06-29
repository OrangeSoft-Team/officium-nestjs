import { Controller, Get, Param } from '@nestjs/common'
import { ExcepcionAplicacion } from '../../../../comun/aplicacion/ExcepcionAplicacion'
import { ObtenerEstadosRespuestaDTO } from '../../../aplicacion/dto/ObtenerEstados.dto'
import { ComunErrorHttpMapeador } from '../../mapeadores/ComunErrorHttp.mapeador'
import { ObtenerEstadosAPIMapeador } from '../../mapeadores/ObtenerEstados.api.mapeador'
import { ServicioEstados } from './estados.service'

@Controller('api/ubicacion/paises/:uuid_pais/estados')
export class ControladorEstados {
  public constructor(private readonly servicioEstados: ServicioEstados) {}

  @Get('')
  public async obtenerPorPais(@Param('uuid_pais') uuidPais: string) {
    // Mapeamos la solicitud al dto del caso de uso de aplicación requerido
    const dtoSolicitud = ObtenerEstadosAPIMapeador.httpSolicitud(uuidPais)
    // Realizamos la solicitud
    const solicitud = await this.servicioEstados.obtenerPorPais(dtoSolicitud)

    // En caso de error
    if (!solicitud.esExitoso) {
      const excepcion = <ExcepcionAplicacion>solicitud.error
      ComunErrorHttpMapeador.manejarExcepcionComun(excepcion, 'GET')
    }

    // En caso de exito mapeamos la respuesta del servicio al dto definido por la API y retornamos la data
    return ObtenerEstadosAPIMapeador.respuestaHttp(
      <ObtenerEstadosRespuestaDTO[]>solicitud.valor,
    )
  }
}
