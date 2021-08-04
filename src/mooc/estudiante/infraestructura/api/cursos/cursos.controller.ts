import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import {
  ApiBasicAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger'
import { IExcepcionAplicacion } from '../../../../../comun/aplicacion/IExcepcionAplicacion'
import { Auth } from '../../../../../comun/infraestructura/dto/Auth.dto'
import { ComandoInscribirCursoEstudiante } from '../../cqrs/comandos/InscribirCursoEstudiante.comando'
import { ComandoResponderCuestionario } from '../../cqrs/comandos/ResponderCuestionario.comando'
import { QueryConsultarCuestionario } from '../../cqrs/queries/ConsultarCuestionario.query'
import { QueryConsultarDetalleCurso } from '../../cqrs/queries/ConsultarDetalleCurso.query'
import { QueryConsultarListaCursos } from '../../cqrs/queries/ConsultarListaCursos.query'
import { QueryVerLeccion } from '../../cqrs/queries/VerLeccion.query'
import {
  CuestionarioCursoApiDTO,
  RespuestasOpcionesApiDTO,
} from '../../dto/CuestionarioCurso.api.dto'
import { DetalleCursoApiDTO } from '../../dto/DetalleCurso.api.dto'
import { LeccionCursoApiDTO } from '../../dto/LeccionCurso.api.dto'
import { ListaCursosApiDTO } from '../../dto/ListaCursos.api.dto'
import { RespuestasCuestionarioApiDTO } from '../../dto/RespuestasCuestionario.api.dto'
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
  @ApiTags('Mooc/Empleado')
  @ApiBasicAuth()
  @ApiOkResponse({
    type: ListaCursosApiDTO,
    isArray: true,
    description: 'Se ha obtenido la lista de cursos disponibles correctamente.',
  })
  @ApiNotFoundResponse({
    description: 'No se ha podido ubicar al empleado.',
  })
  public async ConsultarListadoCursos() {
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
  @ApiTags('Mooc/Empleado')
  @ApiBasicAuth()
  @ApiOkResponse({
    type: DetalleCursoApiDTO,
    description: 'Se ha ubicado el detalle del curso correctamente.',
  })
  @ApiNotFoundResponse({
    description: 'No se ha podido ubicar al empleado o al curso.',
  })
  public async ConsultarDetalleCurso(
    @Body() dto: Auth<any>,
    @Param('uuid_curso') uuid: string,
  ) {
    const solicitud = await this.queryBus.execute(
      new QueryConsultarDetalleCurso({ uuidCurso: uuid }),
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
  @ApiTags('Mooc/Empleado')
  @ApiBasicAuth()
  @ApiParam({
    type: 'string',
    name: 'uuid_curso',
    example: '075b0a4f-f552-43a7-9d68-fc10cec8e63d',
  })
  @ApiCreatedResponse({
    description: 'Se inscribió al empleado correctamente en el curso.',
  })
  @ApiNotFoundResponse({
    description: 'No se ha podido ubicar al curso o al empleado.',
  })
  public async InscribirCursoEstudiante(
    @Body() dto: Auth<any>,
    @Param('uuid_curso') uuidCurso: string,
  ) {
    const solicitud = await this.commandBus.execute(
      new ComandoInscribirCursoEstudiante({
        uuidCurso: uuidCurso,
        uuidEstudiante: dto.idUsuario,
      }),
    )

    if (!solicitud.esExitoso) {
      const excepcion = <IExcepcionAplicacion>solicitud.error
      ErroresHttpCursos.manejarExcepcion(excepcion, 'GET')
    }
    return
  }

  @Post('/:uuid_curso/cuestionario/:uuid_cuestionario')
  @ApiTags('Mooc/Empleado')
  @ApiBasicAuth()
  @ApiParam({
    type: 'string',
    name: 'uuid_curso',
    example: '779847b2-12b9-4d6d-98ec-766f8408a48b',
  })
  @ApiParam({
    type: 'string',
    name: 'uuid_cuestionario',
    example: '5e3a6f18-41d0-4153-a6be-066b0d55fe97',
  })
  @ApiBody({
    type: RespuestasCuestionarioApiDTO,
    isArray: true,
  })
  @ApiOkResponse({
    description: 'Se ha respondido al cuestionario satisfactoriamente.',
  })
  @ApiNotFoundResponse({
    description: 'No se ha podido ubicar al empleado, curso o cuestionario.',
  })
  public async ResponderCuestionario(
    @Body() dto: Auth<RespuestasOpcionesApiDTO[]>,
    @Param('uuid_curso') uuidCurso: string,
    @Param('uuid_cuestionario') uuidCuestionario: string,
  ) {
    const solicitud = await this.commandBus.execute(
      new ComandoResponderCuestionario({
        uuidCurso: uuidCurso,
        uuidCuestionario: uuidCuestionario,
        uuidEstudiante: dto.idUsuario,
        respuestasCuestionario: dto,
      }),
    )

    console.log(solicitud)

    if (!solicitud.esExitoso) {
      const excepcion = <IExcepcionAplicacion>solicitud.error
      ErroresHttpCursos.manejarExcepcion(excepcion, 'GET')
    }
    return solicitud.valor
  }

  @Get('/:uuid_curso/leccion/:uuid_leccion')
  @ApiTags('Mooc/Empleado')
  @ApiBasicAuth()
  @ApiParam({
    type: 'string',
    name: 'uuid_curso',
    example: '779847b2-12b9-4d6d-98ec-766f8408a48b',
  })
  @ApiParam({
    type: 'string',
    name: 'uuid_leccion',
    example: '5e3a6f18-41d0-4153-a6be-066b0d55fe97',
  })
  @ApiOkResponse({
    type: LeccionCursoApiDTO,
    description: 'Se ha obtenido los datos de la lección correctamente.',
  })
  @ApiNotFoundResponse({
    description: 'No se ha podido ubicar al empleado, curso o lección.',
  })
  public async VerLeccion(
    @Body() dto: Auth<any>,
    @Param('uuid_curso') uuidCurso: string,
    @Param('uuid_leccion') uuidLeccion: string,
  ) {
    const solicitud = await this.queryBus.execute(
      new QueryVerLeccion({ uuidLeccion: uuidLeccion, uuidCurso: uuidCurso }),
    )

    if (!solicitud.esExitoso) {
      const excepcion = <IExcepcionAplicacion>solicitud.error
      ErroresHttpCursos.manejarExcepcion(excepcion, 'GET')
    }
    return LeccionApiMapeador.ConvertirRespuestaVerLeccion(solicitud.valor)
  }

  @Get('/:uuid_curso/cuestionario')
  @ApiTags('Mooc/Empleado')
  @ApiBasicAuth()
  @ApiParam({
    type: 'string',
    name: 'uuid_curso',
    example: '779847b2-12b9-4d6d-98ec-766f8408a48b',
  })
  @ApiOkResponse({
    type: CuestionarioCursoApiDTO,
    description: 'Se ubicacaron los datos del cuestionario correctamente.',
  })
  @ApiNotFoundResponse({
    description: 'No se ha podido ubicar el cuestionario del curso.',
  })
  public async ConsultarCuestionario(
    @Body() dto: Auth<any>,
    @Param('uuid_curso') uuidCurso: string,
  ) {
    const solicitud = await this.queryBus.execute(
      new QueryConsultarCuestionario({ uuidCurso: uuidCurso }),
    )

    if (!solicitud.esExitoso) {
      const excepcion = <IExcepcionAplicacion>solicitud.error
      ErroresHttpCursos.manejarExcepcion(excepcion, 'GET')
    }
    return solicitud.valor
  }
}
