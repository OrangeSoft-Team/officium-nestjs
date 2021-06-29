import { Excepcion } from '../../dominio/Excepcion'

export class EstadoNoExiste extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'EstadoNoExiste')
  }
}
