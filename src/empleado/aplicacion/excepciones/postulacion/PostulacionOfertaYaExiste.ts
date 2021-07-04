import { Excepcion } from '../../../../comun/dominio/Excepcion'

export class PostulacionOfertaYaExiste extends Excepcion {
  public constructor(error: string) {
    super(error, 'PostulacionOfertaYaExiste')
  }
}
