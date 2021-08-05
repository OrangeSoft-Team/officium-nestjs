import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import {
  DuracionEstimadaCursoVacio,
  DuracionEscalaCursoInvalida,
  LongitudInvalidaDuracionValorCurso,
} from '../../Excepciones/curso/DuracionEstimadaCurso.excepciones'

type ESCALA_VALORES = 'HORA' | 'DIA' | 'SEMANA' | 'MES'

export class DuracionEstimadaCurso implements IValueObject {
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

  public esIgual(duracion: DuracionEstimadaCurso): boolean {
    return (
      this.duracionEstimadaEscala == duracion.ObtenerDuracionEstimadaEscala() &&
      this.duracionEstimadaValor == duracion.ObtenerDuracionEstimadaValor()
    )
  }

  public static crear(
    duracionEstimadaEscala: ESCALA_VALORES,
    duracionEstimadaValor: number,
  ): DuracionEstimadaCurso {
    
    // Valida que no se presenten errores
    if (duracionEstimadaEscala == null || duracionEstimadaEscala == undefined)
      throw new DuracionEstimadaCursoVacio(
        'La escala de duracion del curso no puede estar vacio.',
      )

    if (duracionEstimadaValor == null || duracionEstimadaValor == undefined)
      throw new DuracionEstimadaCursoVacio(
        'El valor de duracion del curso no puede estar vacio.',
      )

    if (!['HORA', 'DIA', 'SEMANA', 'MES'].includes(duracionEstimadaEscala))
      throw new DuracionEscalaCursoInvalida(
        'La escala de duracion del curso no se encuentra entre los valores comprendidos',
      )

    if (duracionEstimadaValor <= 0)
      throw new LongitudInvalidaDuracionValorCurso(
        'La duracion del curso debe ser mayor a 0',
      )
    if (duracionEstimadaValor > 99)
      throw new LongitudInvalidaDuracionValorCurso(
        'La duracion del curso no puede ser mayor a 99',
      )

    // Si no presenta errores
    return new DuracionEstimadaCurso(
      duracionEstimadaEscala,
      duracionEstimadaValor,
    )
  }
}
