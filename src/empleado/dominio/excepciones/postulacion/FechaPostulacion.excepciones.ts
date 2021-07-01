import { Excepcion } from '../../../../comun/dominio/Excepcion'

export class FechaPostulacionVacia extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'FechaPostulacionVacia')
  }
}

export class FechaPostulacionInvalida extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'FechaPostulacionInvalida')
  }
}
