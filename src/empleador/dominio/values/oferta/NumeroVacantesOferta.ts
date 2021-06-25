import { ValueObject } from '../../../../comun/dominio/ValueObject'
import {
  NumeroVacantesOfertaInvalido,
  NumeroVacantesOfertaNoEsNumero,
  NumeroVacantesOfertaVacio,
} from '../../excepciones/oferta/NumeroVacantesOferta.excepciones'

export class NumeroVacantesOferta extends ValueObject {
  private constructor(private readonly numero: number) {
    super()
  }

  public esIgual(numeroVacantesOferta: NumeroVacantesOferta): boolean {
    return this.numero == numeroVacantesOferta.numero
  }

  public static crear(numero: number): NumeroVacantesOferta {
    // no debe estar vacio
    if (numero == null || numero == undefined)
      throw new NumeroVacantesOfertaVacio(
        numero,
        'El número de vacantes de la oferta laboral no debe estar vacío.',
      )
    // debe ser un numero
    if (typeof numero != 'number')
      throw new NumeroVacantesOfertaNoEsNumero(
        numero,
        'El número de vacantes de la oferta laboral debe ser un número.',
      )

    const numeroVacantesOferta = new NumeroVacantesOferta(numero)

    // debe ser mayor a 0
    if (numero <= 0)
      throw new NumeroVacantesOfertaInvalido(
        numeroVacantesOferta,
        'El número de vacantes de la oferta laboral debe ser mayor a 0.',
      )

    // debe ser menor o igual a 99
    if (numero > 99)
      throw new NumeroVacantesOfertaInvalido(
        numeroVacantesOferta,
        'El número de vacantes de la oferta laboral debe ser menor o igual a 99.',
      )

    return numeroVacantesOferta
  }
}
