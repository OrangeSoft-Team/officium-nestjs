import { EstatusCurso } from '../values/curso/EstatusCurso'
import { FechaCreacionCurso } from '../values/curso/FechaCreacionCurso'
import { IdentificadorCurso } from '../values/curso/IdentificadorCurso'
import { TituloCurso } from '../values/curso/TituloCurso'

export interface DatosRestaurarListaCursos {
  uuid: IdentificadorCurso
  titulo: TituloCurso
  estatus: EstatusCurso
  fechaCreacion: FechaCreacionCurso
}
