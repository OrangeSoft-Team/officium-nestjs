import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { IExcepcionAplicacion } from '../../../../../comun/aplicacion/IExcepcionAplicacion'
import { Auth } from '../../../../../comun/infraestructura/dto/Auth.dto'
import { ComandoInscribirCursoEstudiante } from '../../cqrs/comandos/InscribirCursoEstudiante.comando'
import { QueryConsultarCuestionario } from '../../cqrs/queries/ConsultarCuestionario.query'
import { QueryConsultarDetalleCurso } from '../../cqrs/queries/ConsultarDetalleCurso.query'
import { QueryConsultarListaCursos } from '../../cqrs/queries/ConsultarListaCursos.query'
import { QueryVerLeccion } from '../../cqrs/queries/VerLeccion.query'
import { CursoApiMapeador } from '../../mapeadores/Curso.api.mapeador'
import { LeccionApiMapeador } from '../../mapeadores/Leccion.api.mapeador'
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
    return CursoApiMapeador.convertirRespuestaDetalleCurso(solicitud.valor)
  }

  @Post('/:uuid_curso/inscribirse')
  public async InscribirCursoEstudiante(
    @Body() dto: Auth<any>,
    @Param('uuid_curso') uuidCurso: string,
  ){
    const solicitud = await this.commandBus.execute(
      new ComandoInscribirCursoEstudiante(
        {
          uuidCurso: uuidCurso,
          uuidEstudiante: dto.idUsuario,
        }))

    if (!solicitud.esExitoso) {
      const excepcion = <IExcepcionAplicacion>solicitud.error
      ErroresHttpCursos.manejarExcepcion(excepcion, 'GET')
    }
    return
  }

  @Get('/:uuid_curso/leccion/:uuid_leccion')
  public async VerLeccion(
    @Body() dto: Auth<any>,
    @Param('uuid_curso') uuidCurso: string,
    @Param('uuid_leccion') uuidLeccion: string,
    ){
      const solicitud = await this.queryBus.execute(
        new QueryVerLeccion({uuidLeccion: uuidLeccion, uuidCurso: uuidCurso})
      )

      if (!solicitud.esExitoso) {
        const excepcion = <IExcepcionAplicacion>solicitud.error
        ErroresHttpCursos.manejarExcepcion(excepcion, 'GET')
      }
      return LeccionApiMapeador.ConvertirRespuestaVerLeccion(solicitud.valor)
    }

    @Get('/:uuid_curso/cuestionario')
    public async ConsultarCuestionario(
      @Body() dto: Auth<any>,
      @Param('uuid_curso') uuidCurso: string,
      ){
        const solicitud = await this.queryBus.execute(
          new QueryConsultarCuestionario({uuidCurso: uuidCurso})
        )
  
        if (!solicitud.esExitoso) {
          const excepcion = <IExcepcionAplicacion>solicitud.error
          ErroresHttpCursos.manejarExcepcion(excepcion, 'GET')
        }
        return solicitud.valor
      }
}
