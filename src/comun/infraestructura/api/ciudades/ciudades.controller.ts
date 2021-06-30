import { Controller, Get, Param } from '@nestjs/common'
import { ObtenerCiudadesRespuestaDTO } from '../../../aplicacion/dto/ObtenerCiudades.dto'
import { ExcepcionAplicacion } from '../../../aplicacion/ExcepcionAplicacion'
import { CiudadAPIMapeador } from '../../mapeadores/Ciudad.api.mapeador'
import { ComunErrorHttpMapeador } from '../../mapeadores/ComunErrorHttp.mapeador'
import { ServicioCiudades } from './ciudades.service'

@Controller('api/ubicacion/paises/:uuid_pais/estados/:uuid_estado/ciudades')
export class ControladorCiudades {
  public constructor(private readonly servicioCiudades: ServicioCiudades) {}

  @Get('')
  public async obtenerPorPais(
    @Param('uuid_pais') uuidPais: string,
    @Param('uuid_estado') uuidEstado: string,
  ) {
    // Mapeamos la solicitud al dto del caso de uso de aplicación requerido
    const dtoSolicitud =
      CiudadAPIMapeador.transformarSolicitudHttpObtenerCiudades(
        uuidPais,
        uuidEstado,
      )
    // Realizamos la solicitud
    const solicitud = await this.servicioCiudades.obtenerPorPais(dtoSolicitud)

    // En caso de error
    if (!solicitud.esExitoso) {
      const excepcion = <ExcepcionAplicacion>solicitud.error
      ComunErrorHttpMapeador.manejarExcepcionComun(excepcion, 'GET')
    }

    // En caso de exito mapeamos la respuesta del servicio al dto definido por la API y retornamos la data
    return CiudadAPIMapeador.transformarRespuestaObtenerCiudades(
      <ObtenerCiudadesRespuestaDTO[]>solicitud.valor,
    )
  }
}
