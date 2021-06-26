import { Excepcion } from '../dominio/Excepcion'

export class ExcepcionAplicacion extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'ExcepcionAplicacion')
  }
}
