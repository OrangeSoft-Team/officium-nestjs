import { DuracionEstimadaCurso } from '../values/curso/DuracionEstimadaCurso'
import { IdentificadorCurso } from '../values/curso/IdentificadorCurso'
import { TituloCurso } from '../values/curso/TituloCurso'
import { IdentificadorHabilidad } from '../../../tutor/dominio/values/habilidad/IdentificadorHabilidad';


export interface DatosRestaurarHabilidad{
  uuidHabilidad: IdentificadorHabilidad;
}

export interface DatosRestaurarCurso {
  identificador: IdentificadorCurso
  nombre: TituloCurso
  duracionEstimada: DuracionEstimadaCurso
  uuidHabilidades: DatosRestaurarHabilidad[]
}


