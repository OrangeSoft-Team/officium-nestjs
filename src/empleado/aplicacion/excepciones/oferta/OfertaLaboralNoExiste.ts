import { Excepcion } from '../../../../comun/dominio/Excepcion'

export class OfertaLaboralNoExiste extends Excepcion {
  public constructor(valor: any, error: string) {
    super(valor, error, 'OfertaLaboralNoExiste')
  }
}
