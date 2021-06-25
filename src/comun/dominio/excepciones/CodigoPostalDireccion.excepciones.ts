import { Excepcion } from '../Excepcion'
import { CodigoPostalDireccion } from '../values/CodigoPostalDireccion'

export class CodigoPostalDireccionVacia extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'CodigoPostalDireccionVacia')
  }
}

export class LongitudInvalidaCodigoPostalDireccion extends Excepcion {
  public constructor(valor: CodigoPostalDireccion, error: string) {
    super(valor, error, 'LongitudInvalidaCodigoPostalDireccion')
  }
}
