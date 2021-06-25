import { Excepcion } from '../../../../comun/dominio/Excepcion'
import { TurnoOferta } from '../../values/oferta/TurnoOferta'

export class TurnoOfertaVacio extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'TurnoOfertaVacio')
  }
}

export class TurnoOfertaInvalido extends Excepcion {
  public constructor(valor: TurnoOferta, error: string) {
    super(valor, error, 'TurnoOfertaInvalido')
  }
}
