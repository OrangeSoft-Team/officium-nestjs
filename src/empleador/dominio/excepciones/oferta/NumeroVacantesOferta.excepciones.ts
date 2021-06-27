import { Excepcion } from '../../../../comun/dominio/Excepcion'
import { NumeroVacantesOferta } from '../../values/oferta/NumeroVacantesOferta'

export class NumeroVacantesOfertaInvalido extends Excepcion {
  public constructor(valor: NumeroVacantesOferta, error: string) {
    super(valor, error, 'NumeroVacantesOfertaInvalido')
  }
}

export class NumeroVacantesOfertaNoEsNumero extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'NumeroVacantesOfertaNoEsNumero')
  }
}

export class NumeroVacantesOfertaVacio extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'NumeroVacantesOfertaVacio')
  }
}
