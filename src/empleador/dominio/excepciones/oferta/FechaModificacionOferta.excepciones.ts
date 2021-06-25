import { Excepcion } from '../../../../comun/dominio/Excepcion'

export class FechaModificacionOfertaVacia extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'FechaModificacionOfertaVacia')
  }
}

export class FechaModificacionOfertaInvalida extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'FechaModificacionOfertaInvalida')
  }
}
