import { Excepcion } from '../../../../comun/dominio/Excepcion'
import { SueldoOferta } from '../../values/oferta/SueldoOferta'

export class SueldoOfertaInvalido extends Excepcion {
  public constructor(valor: SueldoOferta, error: string) {
    super(valor, error, 'SueldoOfertaInvalido')
  }
}

export class SueldoOfertaNoEsNumero extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'SueldoOfertaNoEsNumero')
  }
}

export class SueldoOfertaVacio extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'SueldoOfertaVacio')
  }
}
