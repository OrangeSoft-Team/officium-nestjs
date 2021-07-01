import { Excepcion } from '../../../comun/dominio/Excepcion'

export class PostulacionOfertaYaExiste extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'PostulacionOfertaYaExiste')
  }
}
