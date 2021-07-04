import { Excepcion } from '../../../../comun/dominio/Excepcion'

export class EstadoPostulacionVacio extends Excepcion {
  public constructor(error: string) {
    super(error, 'EstadoPostulacionVacio')
  }
}

export class EstadoPostulacionInvalido extends Excepcion {
  public constructor(error: string) {
    super(error, 'EstadoPostulacionInvalido')
  }
}
