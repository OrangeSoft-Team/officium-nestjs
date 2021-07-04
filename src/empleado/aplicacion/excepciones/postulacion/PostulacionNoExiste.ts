import { Excepcion } from '../../../../comun/dominio/Excepcion'

export class PostulacionNoExiste extends Excepcion {
  public constructor(error: string) {
    super(error, 'PostulacionNoExiste')
  }
}
