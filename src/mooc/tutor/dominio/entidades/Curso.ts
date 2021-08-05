import { Entidad } from '../../../../comun/dominio/Entidad'
import { EstatusCurso } from '../values/curso/EstatusCurso'
import { IdentificadorCurso } from '../values/curso/IdentificadorCurso'
import { TituloCurso } from '../values/curso/TituloCurso'
import { DuracionEstimadaCurso } from '../values/curso/DuracionEstimadaCurso';
import { FechaCreacionCurso } from '../values/curso/FechaCreacionCurso';
import { Habilidad } from './Habilidad'

export interface DatosCurso {
      identificador: IdentificadorCurso
      titulo: TituloCurso
      estatus: EstatusCurso
      duracionEstimada: DuracionEstimadaCurso
      fechaCreacion: FechaCreacionCurso
      habilidades?: Habilidad[]
    }

export class Curso extends Entidad {
      private constructor(
            private readonly identificador: IdentificadorCurso,
            private titulo: TituloCurso,
            private estatus: EstatusCurso,
            private duracionEstimada: DuracionEstimadaCurso,
            private fechaCreacion: FechaCreacionCurso,
            private idHabilidades: Habilidad[],
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

      public obtenerHabilidades() {
            return this.idHabilidades
      }

      public static crear(datos: DatosCurso): Curso {
            return new Curso(
            datos.identificador,
            datos.titulo,
            datos.estatus,
            datos.duracionEstimada,
            datos.fechaCreacion,
            datos.habilidades
            )
      }
}
