import { Body, Controller, Get } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { IExcepcionAplicacion } from '../../../../../comun/aplicacion/IExcepcionAplicacion'
import { Auth } from '../../../../../comun/infraestructura/dto/Auth.dto'
import { QueryConsultarListaCursos } from '../../cqrs/queries/ConsultarListaCursos.query'
import { CursoApiMapeador } from '../../mapeadores/Curso.api.mapeador'
import { ErroresHttpCursos } from './cursos.errores'

@Controller('api/empleado/cursos')
export class ControladorCursos {
  public constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  public async ConsultarListadoCursos(@Body() dto: Auth<any>) {
    const solicitud = await this.queryBus.execute(
      new QueryConsultarListaCursos(),
    )

    // En caso de error
    if (!solicitud.esExitoso) {
      const excepcion = <IExcepcionAplicacion>solicitud.error
      ErroresHttpCursos.manejarExcepcion(excepcion, 'GET')
    }

    // En caso de exito
    return CursoApiMapeador.convertirRespuestaListarCursos(solicitud.valor)
  }
}
