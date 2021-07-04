import { Excepcion } from '../../../../comun/dominio/Excepcion'

export class OfertaLaboralYaExiste extends Excepcion {
  public constructor(error: string) {
    super(error, 'OfertaLaboralYaExiste')
  }
}
