import { Entidad } from '../../../../comun/dominio/Entidad'
import { Habilidad } from '../../../../core/empleador/dominio/entidades/Habilidad'
import { DuracionEstimadaCurso } from '../values/curso/DuracionEstimadaCurso'
import { EstatusCurso } from '../values/curso/EstatusCurso'
import { FechaCreacionCurso } from '../values/curso/FechaCreacionCurso'
import { FechaUltimaModificacionCurso } from '../values/curso/FechaUltimaModificacionCurso'
import { IdentificadorCurso } from '../values/curso/IdentificadorCurso'
import { TituloCurso } from '../values/curso/TituloCurso'
import { Cuestionario } from './Cuestionario'
import { Leccion } from './Leccion'

export interface DatosCurso {
  identificador: IdentificadorCurso
  titulo: TituloCurso
  estatus: EstatusCurso
  duracionEstimada: DuracionEstimadaCurso
  fechaCreacion: FechaCreacionCurso
  fechaModificacion?: FechaUltimaModificacionCurso
  habilidades: Habilidad[]
  cuestionario: Cuestionario
  lecciones: Leccion[]
}

export class Curso extends Entidad {
  private constructor(
    private readonly identificador: IdentificadorCurso,
    private titulo: TituloCurso,
    private estatus: EstatusCurso,
    private duracionEstimada: DuracionEstimadaCurso,
    private fechaCreacion: FechaCreacionCurso,
    private habilidades: Habilidad[],
    private cuestionario: Cuestionario,
    private lecciones: Leccion[],
    private fechaModificacion?: FechaUltimaModificacionCurso,
  ) {
    super()
  }

  public obtenerIdentificador() {
    return this.identificador
  }

  public esIgual(curso: Curso): boolean {
    return this.identificador.esIgual(curso.obtenerIdentificador())
  }

  public obtenerTitulo() {
    return this.titulo
  }

  public obtenerEstatus() {
    return this.estatus
  }

  public obtenerDuracionEstimada() {
    return this.duracionEstimada
  }

  public obtenerFechaCreacion() {
    return this.fechaCreacion
  }

  public obtenerFechaModificacion() {
    return this.fechaModificacion
  }

  public obtenerHabilidades() {
    return this.habilidades
  }

  public obtenerCuestionario() {
    return this.cuestionario
  }

  public obtenerLecciones() {
    return this.lecciones
  }

  public static crear(datos: DatosCurso): Curso {
    return new Curso(
      datos.identificador,
      datos.titulo,
      datos.estatus,
      datos.duracionEstimada,
      datos.fechaCreacion,
      datos.habilidades,
      datos.cuestionario,
      datos.lecciones,
      datos.fechaModificacion,
    )
  }

  public static restaurar(datos: DatosCurso): Curso {
    return new Curso(
      datos.identificador,
      datos.titulo,
      datos.estatus,
      datos.duracionEstimada,
      datos.fechaCreacion,
      datos.habilidades,
      datos.cuestionario,
      datos.lecciones,
      datos.fechaModificacion,
    )
  }
}
