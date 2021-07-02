import { Excepcion } from '../../../comun/dominio/Excepcion'

export class PostulacionNoExiste extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'PostulacionNoExiste')
  }
}