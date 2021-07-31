import { IExcepcionAplicacion } from '../../../../comun/aplicacion/IExcepcionAplicacion'
import { IServicioAplicacion } from '../../../../comun/aplicacion/IServicioAplicacion'
import { Resultado } from '../../../../comun/aplicacion/Resultado'
import { HabilidadMapeador } from '../../aplicacion/mapeadores/Habilidad.mapeador'
import { IRepositorioHabilidades } from '../../aplicacion/puertos/IRepositorioHabilidades'
import { CursoNoExiste } from '../../dominio/excepciones/curso/Curso.excepciones'
import { ConsultarDetalleCursoQueryDTO, ConsultarDetalleCursoRespuestaDTO } from '../dto/queries/ConsultarDetalleCurso.query'
import { CursoMapeador } from '../mapeadores/Curso.mapeador'
import { LeccionMapeador } from '../mapeadores/Leccion.mapeador'
import { IRepositorioCursos } from '../puertos/IRepositorioCursos'
import { IRepositorioLecciones } from '../puertos/IRepositorioLecciones'

export class ServicioConsultarDetalleCurso implements IServicioAplicacion {
  public constructor(private readonly repositorioCursos: IRepositorioCursos,
                     private readonly repositorioHabilidades: IRepositorioHabilidades,
                     private readonly repositorioLecciones: IRepositorioLecciones,
    ) {}

  public async ejecutar(query: ConsultarDetalleCursoQueryDTO
    ): Promise<Resultado<any>> {
    try {
      //Traer curso, lecciones y habilidades de persistencia
      const cursoPersistencia = await this.repositorioCursos.consultar({uuid: query.uuidCurso})
      if(!cursoPersistencia)
        throw new CursoNoExiste('El curso no se ha encontrado.')

      const leccionesPersistencia = await this.repositorioLecciones.listar({uuidCurso: cursoPersistencia.uuid})
      const habilidadesPersistencia = await this.repositorioHabilidades.listar({uuidCurso: cursoPersistencia.uuid})

      //Mapear curso, lecciones y habilidades a dominio
      const cursoDominio = CursoMapeador.ConvertirDetalleCursoDominio(
          cursoPersistencia,
        )
      const leccionesDominio = LeccionMapeador.ConvertirListaleccionesDominio(
          leccionesPersistencia
        )
      const habilidadesDominio = HabilidadMapeador.ConvertirListaHabilidadesDominio(
          habilidadesPersistencia
        )

      //Mapear curso, lecciones y habilidades a respuesta y retornar
      const leccionesRespuesta = LeccionMapeador.ConvertirListaLeccionesRespuesta(leccionesDominio)
      const habilidadesRespuesta = HabilidadMapeador.ConvertirListaHabilidadesRespuesta(habilidadesDominio)
      const respuesta = CursoMapeador.ConvertirDetalleCursoRespuesta(cursoDominio, leccionesRespuesta, habilidadesRespuesta)
      return Resultado.ok<ConsultarDetalleCursoRespuestaDTO>(respuesta)

    } catch (error) {
      return Resultado.falla<IExcepcionAplicacion>(error)
    }
  }
}