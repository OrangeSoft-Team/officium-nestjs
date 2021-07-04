import { Excepcion } from '../dominio/Excepcion'

export class ExcepcionAplicacion extends Excepcion {
  public constructor(error: string) {
    super(error, 'ExcepcionAplicacion')
  }
}
