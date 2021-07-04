import { Excepcion } from '../../../../comun/dominio/Excepcion'

export class FechaPostulacionVacia extends Excepcion {
  public constructor(error: string) {
    super(error, 'FechaPostulacionVacia')
  }
}

export class FechaPostulacionInvalida extends Excepcion {
  public constructor(error: string) {
    super(error, 'FechaPostulacionInvalida')
  }
}
