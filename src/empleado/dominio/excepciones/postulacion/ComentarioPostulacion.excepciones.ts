import { Excepcion } from '../../../../comun/dominio/Excepcion'

export class ComentarioPostulacionVacio extends Excepcion {
  public constructor(error: string) {
    super(error, 'ComentarioPostulacionVacio')
  }
}

export class LongitudInvalidaComentarioPostulacion extends Excepcion {
  public constructor(error: string) {
    super(error, 'LongitudInvalidaComentarioPostulacion')
  }
}
