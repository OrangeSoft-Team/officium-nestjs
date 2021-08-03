import { Controller, Get, Param } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger'
import { IExcepcionAplicacion } from '../../aplicacion/IExcepcionAplicacion'
import { QueryObtenerCiudades } from '../cqrs/queries/ObtenerCiudades.query'
import { QueryObtenerEstados } from '../cqrs/queries/ObtenerEstados.query'
import { QueryObtenerPaises } from '../cqrs/queries/ObtenerPaises.query'
import { CiudadesApiDTO } from '../dto/Ciudades.api.dto'
import { EstadosApiDTO } from '../dto/Estados.api.dto'
import { PaisesApiDTO } from '../dto/Paises.api.dto'
import { UbicacionApiMapeador } from '../mapeadores/Ubicacion.mapeador'
import { ErroresHttpUbicaciones } from './ubicaciones.errores'

@Controller('api/ubicacion')
export class ControladorUbicaciones {
  public constructor(private readonly queryBus: QueryBus) {}

  @Get('/paises')
  @ApiTags('Común')
  @ApiOkResponse({
    type: PaisesApiDTO,
    isArray: true,
    description: 'Se obtuvieron los paises registrados correctamente.',
  })
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
  @ApiTags('Común')
  @ApiParam({
    type: 'string',
    name: 'uuid_pais',
    example: '07efd672-57bc-48c9-a7d4-4aa6903ca779',
  })
  @ApiOkResponse({
    type: EstadosApiDTO,
    isArray: true,
    description: 'Se obtuvieron los estados del país registrado correctamente.',
  })
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

  @Get('/paises/:uuid_pais/estados/:uuid_estado/ciudades')
  @ApiTags('Común')
  @ApiParam({
    type: 'string',
    name: 'uuid_pais',
    example: '07efd672-57bc-48c9-a7d4-4aa6903ca779',
  })
  @ApiParam({
    type: 'string',
    name: 'uuid_estado',
    example: 'd85538c3-9c38-4366-a3d0-8b7a0967eac8',
  })
  @ApiOkResponse({
    type: CiudadesApiDTO,
    isArray: true,
    description:
      'Se obtuvieron las ciudades del estado registrado correctamente.',
  })
  public async obtenerCiudades(
    @Param('uuid_pais') idPais: string,
    @Param('uuid_estado') idEstado: string,
  ) {
    const solicitud = await this.queryBus.execute(
      new QueryObtenerCiudades({ idPais, idEstado }),
    )

    // En caso de error
    if (!solicitud.esExitoso) {
      const excepcion = <IExcepcionAplicacion>solicitud.error
      ErroresHttpUbicaciones.manejarExcepcion(excepcion, 'GET')
    }

    // En caso de exito
    return UbicacionApiMapeador.convertirRespuestaObtenerCiudades(
      solicitud.valor,
    )
  }
}
