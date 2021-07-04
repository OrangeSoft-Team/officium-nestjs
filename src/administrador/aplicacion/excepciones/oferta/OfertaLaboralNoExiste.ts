import { Excepcion } from '../../../../comun/dominio/Excepcion'

export class OfertaLaboralNoExiste extends Excepcion {
  public constructor(error: string) {
    super(error, 'OfertaLaboralNoExiste')
  }
}
