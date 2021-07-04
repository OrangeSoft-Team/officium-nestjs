import { Excepcion } from '../../dominio/Excepcion'

export class PaisNoExiste extends Excepcion {
  public constructor(error: string) {
    super(error, 'PaisNoExiste')
  }
}
