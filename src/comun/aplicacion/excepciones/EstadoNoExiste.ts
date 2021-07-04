import { Excepcion } from '../../dominio/Excepcion'

export class EstadoNoExiste extends Excepcion {
  public constructor(error: string) {
    super(error, 'EstadoNoExiste')
  }
}
