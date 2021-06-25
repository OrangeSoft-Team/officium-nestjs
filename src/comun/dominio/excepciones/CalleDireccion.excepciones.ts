import { Excepcion } from '../Excepcion'
import { CalleDireccion } from '../values/CalleDireccion'

export class CalleDireccionVacia extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'CalleDireccionVacia')
  }
}

export class LongitudInvalidaCalleDireccion extends Excepcion {
  public constructor(valor: CalleDireccion, error: string) {
    super(valor, error, 'LongitudInvalidaCalleDireccion')
  }
}
