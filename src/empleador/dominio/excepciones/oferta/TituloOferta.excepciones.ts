import { Excepcion } from '../../../../comun/dominio/Excepcion'

export class LongitudInvalidaTituloOferta extends Excepcion {
  public constructor(error: string) {
    super(error, 'LongitudInvalidaTituloOferta')
  }
}

export class TituloOfertaVacio extends Excepcion {
  public constructor(error: string) {
    super(error, 'TituloOfertaVacio')
  }
}
