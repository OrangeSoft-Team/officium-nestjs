import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import {
  DuracionEstimadaCuestionarioVacio,
  DuracionEscalaCuestionarioInvalida,
  LongitudInvalidaDuracionValorCuestionario,
} from '../../excepciones/cuestionario/DuracionEstimadaCuestionario.excepciones'

type ESCALA_VALORES = 'MINUTO' | 'HORA'

export class DuracionEstimadaCuestionario implements IValueObject {
  private constructor(
    private readonly duracionEstimadaEscala: ESCALA_VALORES,
    private readonly duracionEstimadaValor: number,
  ) {}

  public ObtenerDuracionEstimadaEscala() {
    return this.duracionEstimadaEscala
  }

  public ObtenerDuracionEstimadaValor() {
    return this.duracionEstimadaValor
  }

  public esIgual(duracion: DuracionEstimadaCuestionario): boolean {
    return (
      this.duracionEstimadaEscala == duracion.ObtenerDuracionEstimadaEscala() &&
      this.duracionEstimadaValor == duracion.ObtenerDuracionEstimadaValor()
    )
  }

  public static crear(
    duracionEstimadaEscala: ESCALA_VALORES,
    duracionEstimadaValor: number,
  ): DuracionEstimadaCuestionario {
    // No debe ser vacio
    if (duracionEstimadaEscala == null || duracionEstimadaEscala == undefined)
      throw new DuracionEstimadaCuestionarioVacio(
        'La escala de duracion del cuestionario no puede estar vacio.',
      )

    if (duracionEstimadaValor == null || duracionEstimadaValor == undefined)
      throw new DuracionEstimadaCuestionarioVacio(
        'El valor de duracion del cuestionario no puede estar vacio.',
      )

    if (!['MINUTO', 'HORA'].includes(duracionEstimadaEscala))
      throw new DuracionEscalaCuestionarioInvalida(
        'La escala de duracion del cuestionario no se encuentra entre los valores validos',
      )

    if (duracionEstimadaValor <= 0)
      throw new LongitudInvalidaDuracionValorCuestionario(
        'La duracion cuestionario debe ser mayor a 0 caracteres',
      )
    if (duracionEstimadaValor > 99)
      throw new LongitudInvalidaDuracionValorCuestionario(
        'La duracion del cuestionario no puede ser mayor a 99 caracteres',
      )

    // Si no hay errores
    return new DuracionEstimadaCuestionario(
      duracionEstimadaEscala,
      duracionEstimadaValor,
    )
  }
}
