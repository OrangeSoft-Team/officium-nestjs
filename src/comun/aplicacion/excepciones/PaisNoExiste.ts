import { Excepcion } from '../../dominio/Excepcion'

export class PaisNoExiste extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'PaisNoExiste')
  }
}
