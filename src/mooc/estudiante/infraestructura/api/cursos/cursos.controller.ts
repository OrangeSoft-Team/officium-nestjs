import { Body, Controller, Get, Param } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { IExcepcionAplicacion } from '../../../../../comun/aplicacion/IExcepcionAplicacion'
import { Auth } from '../../../../../comun/infraestructura/dto/Auth.dto'
import { QueryConsultarDetalleCurso } from '../../cqrs/queries/ConsultarDetalleCurso.query'
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

  @Get('/:uuid_curso')
  public async ConsultarDetalleCurso(
      @Body() dto: Auth<any>,
      @Param('uuid_curso') uuid: string,
  ) {
    const solicitud = await this.queryBus.execute(
      new QueryConsultarDetalleCurso({uuidCurso: uuid}),
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
