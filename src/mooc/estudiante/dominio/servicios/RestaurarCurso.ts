import { DuracionEstimadaCurso } from '../values/curso/DuracionEstimadaCurso'
import { EstatusCurso } from '../values/curso/EstatusCurso'
import { FechaCreacionCurso } from '../values/curso/FechaCreacionCurso'
import { FechaUltimaModificacionCurso } from '../values/curso/FechaUltimaModificacionCurso'
import { IdentificadorCurso } from '../values/curso/IdentificadorCurso'
import { TituloCurso } from '../values/curso/TituloCurso'

export interface DatosRestaurarListaCursos {
  uuid: IdentificadorCurso
  titulo: TituloCurso
  estatus: EstatusCurso
  fechaCreacion: FechaCreacionCurso
}

export interface DatosRestaurarDetalleCurso {
  uuid: IdentificadorCurso
  titulo: TituloCurso
  estatus: EstatusCurso
  duracionEstimada: DuracionEstimadaCurso
  fechaCreacion: FechaCreacionCurso
  fechaUltimaModificacion: FechaUltimaModificacionCurso
}
