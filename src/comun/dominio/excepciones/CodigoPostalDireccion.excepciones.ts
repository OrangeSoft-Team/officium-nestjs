import { Excepcion } from '../Excepcion'

export class CodigoPostalDireccionVacia extends Excepcion {
  public constructor(error: string) {
    super(error, 'CodigoPostalDireccionVacia')
  }
}

export class LongitudInvalidaCodigoPostalDireccion extends Excepcion {
  public constructor(error: string) {
    super(error, 'LongitudInvalidaCodigoPostalDireccion')
  }
}
