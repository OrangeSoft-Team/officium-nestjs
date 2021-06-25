import { ValueObject } from '../../../../comun/dominio/ValueObject'
import {
  SueldoOfertaVacio,
  SueldoOfertaNoEsNumero,
  SueldoOfertaInvalido,
} from '../../excepciones/oferta/SueldoOferta.excepciones'

export class SueldoOferta extends ValueObject {
  private constructor(private readonly sueldo: number) {
    super()
  }

  public esIgual(sueldoOferta: SueldoOferta): boolean {
    return this.sueldo == sueldoOferta.sueldo
  }

  public static crear(sueldo: number): SueldoOferta {
    // No debe ser vacío
    if (sueldo == null || sueldo == undefined)
      throw new SueldoOfertaVacio(
        sueldo,
        'El sueldo de la oferta laboral no puede estar vacío.',
      )
    // Debe ser un numero
    if (typeof sueldo != 'number')
      throw new SueldoOfertaNoEsNumero(
        sueldo,
        'El sueldo de la oferta laboral debe ser un número.',
      )

    const sueldoOferta = new SueldoOferta(parseFloat(sueldo.toFixed(2)))

    // Debe ser positivo y mayor a 0
    if (sueldo <= 0)
      throw new SueldoOfertaInvalido(
        sueldoOferta,
        'El sueldo de la oferta laboral debe ser mayor a 0,00.',
      )
    // Debe ser menor o igual a 1.000.000
    if (sueldo > 1_000_000)
      throw new SueldoOfertaInvalido(
        sueldoOferta,
        'El sueldo de la oferta laboral debe ser menor o igual a 1.000.000,00',
      )

    return sueldoOferta
  }
}
