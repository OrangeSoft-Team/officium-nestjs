import { Excepcion } from '../../../../comun/dominio/Excepcion'
import { DuracionOferta } from '../../values/oferta/DuracionOferta'

export class DuracionOfertaInvalida extends Excepcion {
  public constructor(valor: DuracionOferta, error: string) {
    super(valor, error, 'DuracionOfertaInvalida')
  }
}

export class DuracionOfertaNoEsNumero extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'DuracionOfertaNoEsNumero')
  }
}

export class DuracionOfertaVacia extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'DuracionOfertaVacia')
  }
}

export class EscalaDuracionOfertaInvalida extends Excepcion {
  public constructor(valor: DuracionOferta, error: string) {
    super(valor, error, 'EscalaDuracionOfertaInvalida')
  }
}

export class EscalaDuracionOfertaVacia extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'EscalaDuracionOfertaVacia')
  }
}
