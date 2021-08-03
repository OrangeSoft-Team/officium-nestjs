import { Controller, Get } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { IExcepcionAplicacion } from '../../aplicacion/IExcepcionAplicacion'
import { QueryObtenerHabilidades } from '../cqrs/queries/ObtenerHabilidades.query'
import { HabilidadesApiDTO } from '../dto/Habilidades.api.dto'
import { HabilidadApiMapeador } from '../mapeadores/Habilidad.api.mapeador'
import { ErroresHttpHabilidades } from './habilidades.errores'

@Controller('api/habilidades')
export class ControladorHabilidades {
  public constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOkResponse({
    description: 'Se obtuvieron las habilidades correctamente.',
    type: HabilidadesApiDTO,
    isArray: true,
  })
  @ApiTags('Común')
  public async obtenerHabilidades() {
    const solicitud = await this.queryBus.execute(new QueryObtenerHabilidades())

    // En caso de error
    if (!solicitud.esExitoso) {
      const excepcion = <IExcepcionAplicacion>solicitud.error
      ErroresHttpHabilidades.manejarExcepcion(excepcion, 'GET')
    }

    // En caso de exito
    return HabilidadApiMapeador.convertirRespuestaObtenerHabilidades(
      solicitud.valor,
    )
  }
}
