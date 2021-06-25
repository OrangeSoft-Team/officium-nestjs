import { Excepcion } from '../../../../comun/dominio/Excepcion'
import { DescripcionOferta } from '../../values/oferta/DescripcionOferta'

export class DescripcionOfertaVacia extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'DescripcionOfertaVacia')
  }
}

export class LongitudInvalidaDescripcionOferta extends Excepcion {
  public constructor(valor: DescripcionOferta, error: string) {
    super(valor, error, 'LongitudInvalidaDescripcionOferta')
  }
}
