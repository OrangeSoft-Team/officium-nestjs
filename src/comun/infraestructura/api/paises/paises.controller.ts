import { Controller, Get } from '@nestjs/common'
import { ExcepcionAplicacion } from '../../../../comun/aplicacion/ExcepcionAplicacion'
import { ObtenerPaisesRespuestaDTO } from '../../../aplicacion/dto/ObtenerPaises.dto'
import { ComunErrorHttpMapeador } from '../../mapeadores/ComunErrorHttp.mapeador'
import { ObtenerPaisesAPIMapeador } from '../../mapeadores/ObtenerPaises.api.mapeador'
import { ServicioPaises } from './paises.service'

@Controller('api/ubicacion/paises')
export class ControladorPaises {
  public constructor(private readonly servicioPaises: ServicioPaises) {}

  @Get('')
  public async obtenerPaises() {
    // Realizamos la solicitud
    const solicitud = await this.servicioPaises.obtenerOfertasLaboralesActivas()

    // En caso de error
    if (!solicitud.esExitoso) {
      const excepcion = <ExcepcionAplicacion>solicitud.error
      ComunErrorHttpMapeador.manejarExcepcionComun(excepcion, 'GET')
    }

    // En caso de exito mapeamos la respuesta del servicio al dto definido por la API y retornamos la data
    return ObtenerPaisesAPIMapeador.respuestaHttp(
      <ObtenerPaisesRespuestaDTO[]>solicitud.valor,
    )
  }
}
