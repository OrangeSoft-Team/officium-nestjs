import { Excepcion } from '../../../../comun/dominio/Excepcion'
import { TituloOferta } from '../../values/oferta/TituloOferta'

export class LongitudInvalidaTituloOferta extends Excepcion {
  public constructor(valor: TituloOferta, error: string) {
    super(valor, error, 'LongitudInvalidaTituloOferta')
  }
}

export class TituloOfertaVacio extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'TituloOfertaVacio')
  }
}
