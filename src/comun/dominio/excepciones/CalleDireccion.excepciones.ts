import { Excepcion } from '../Excepcion'

export class CalleDireccionVacia extends Excepcion {
  public constructor(error: string) {
    super(error, 'CalleDireccionVacia')
  }
}

export class LongitudInvalidaCalleDireccion extends Excepcion {
  public constructor(error: string) {
    super(error, 'LongitudInvalidaCalleDireccion')
  }
}
