import { Excepcion } from '../../../../comun/dominio/Excepcion'
import { EstadoOferta } from '../../values/oferta/EstadoOferta'

export class EstadoOfertaVacio extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'EstadoOfertaVacio')
  }
}

export class EstadoOfertaInvalido extends Excepcion {
  public constructor(valor: EstadoOferta, error: string) {
    super(valor, error, 'EstadoOfertaInvalido')
  }
}
