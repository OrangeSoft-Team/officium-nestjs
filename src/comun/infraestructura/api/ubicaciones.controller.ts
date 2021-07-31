import { Controller, Get, Param } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'
import { IExcepcionAplicacion } from '../../aplicacion/IExcepcionAplicacion'
import { QueryObtenerEstados } from '../cqrs/queries/ObtenerEstados.query'
import { QueryObtenerPaises } from '../cqrs/queries/ObtenerPaises.query'
import { UbicacionApiMapeador } from '../mapeadores/Ubicacion.mapeador'
import { ErroresHttpUbicaciones } from './ubicaciones.errores'

@Controller('api/ubicacion')
export class ControladorUbicaciones {
  public constructor(private readonly queryBus: QueryBus) {}

  @Get('/paises')
  public async obtenerPaises() {
    const solicitud = await this.queryBus.execute(new QueryObtenerPaises())

    // En caso de error
    if (!solicitud.esExitoso) {
      const excepcion = <IExcepcionAplicacion>solicitud.error
      ErroresHttpUbicaciones.manejarExcepcion(excepcion, 'GET')
    }

    // En caso de exito
    return UbicacionApiMapeador.convertirRespuestaObtenerPaises(solicitud.valor)
  }

  @Get('/paises/:uuid_pais/estados')
  public async obtenerEstados(@Param('uuid_pais') idPais: string) {
    const solicitud = await this.queryBus.execute(
      new QueryObtenerEstados({ idPais }),
    )

    // En caso de error
    if (!solicitud.esExitoso) {
      const excepcion = <IExcepcionAplicacion>solicitud.error
      ErroresHttpUbicaciones.manejarExcepcion(excepcion, 'GET')
    }

    // En caso de exito
    return UbicacionApiMapeador.convertirRespuestaObtenerEstados(
      solicitud.valor,
    )
  }
}
