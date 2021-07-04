import { Excepcion } from '../../../../comun/dominio/Excepcion'

export class CargoOfertaVacio extends Excepcion {
  public constructor(error: string) {
    super(error, 'CargoOfertaVacio')
  }
}

export class LongitudInvalidaCargoOferta extends Excepcion {
  public constructor(error: string) {
    super(error, 'LongitudInvalidaCargoOferta')
  }
}
