import { Excepcion } from '../../../../comun/dominio/Excepcion'
export class DescripcionOfertaVacia extends Excepcion {
  public constructor(error: string) {
    super(error, 'DescripcionOfertaVacia')
  }
}

export class LongitudInvalidaDescripcionOferta extends Excepcion {
  public constructor(error: string) {
    super(error, 'LongitudInvalidaDescripcionOferta')
  }
}
