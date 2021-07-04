import { Excepcion } from '../../../../comun/dominio/Excepcion'

export class FechaModificacionOfertaVacia extends Excepcion {
  public constructor(error: string) {
    super(error, 'FechaModificacionOfertaVacia')
  }
}

export class FechaModificacionOfertaInvalida extends Excepcion {
  public constructor(error: string) {
    super(error, 'FechaModificacionOfertaInvalida')
  }
}
