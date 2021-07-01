import { Excepcion } from '../../../../comun/dominio/Excepcion'
import { ComentarioPostulacion } from '../../values/postulacion/ComentarioPostulacion'

export class ComentarioPostulacionVacio extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'ComentarioPostulacionVacio')
  }
}

export class LongitudInvalidaComentarioPostulacion extends Excepcion {
  public constructor(valor: ComentarioPostulacion, error: string) {
    super(valor, error, 'LongitudInvalidaComentarioPostulacion')
  }
}
