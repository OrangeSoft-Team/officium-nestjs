import { Excepcion } from '../../../../comun/dominio/Excepcion'
import { CargoOferta } from '../../values/oferta/CargoOferta'

export class CargoOfertaVacio extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'CargoOfertaVacio')
  }
}

export class LongitudInvalidaCargoOferta extends Excepcion {
  public constructor(valor: CargoOferta, error: string) {
    super(valor, error, 'LongitudInvalidaCargoOferta')
  }
}
