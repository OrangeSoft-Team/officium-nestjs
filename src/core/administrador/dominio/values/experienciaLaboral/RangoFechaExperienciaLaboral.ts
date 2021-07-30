import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import {
  FechaInicioExperienciaLaboralVacia,
  FechaInicioExperienciaLaboralInvalida,
  FechaFinExperienciaLaboralVacia,
  FechaFinExperienciaLaboralInvalida,
  FechaFinNoMayorDeFechaInicioExperienciaLaboral,
} from '../../excepciones/experienciaLaboral/RangoFechaExperienciaLaboral.excepciones'

export class RangoFechaExperienciaLaboral implements IValueObject {
  private constructor(
    private readonly fechaInicio: Date,
    private readonly fechaFin: Date,
  ) {}

  public obtenerFechaInicio() {
    return this.fechaInicio
  }

  public obtenerFechaFin() {
    return this.fechaFin
  }

  public esIgual(fechaExperiencia: RangoFechaExperienciaLaboral): boolean {
    return (
      this.fechaInicio == fechaExperiencia.fechaInicio &&
      this.fechaFin == fechaExperiencia.fechaFin
    )
  }

  public static crear(
    fechaInicio: Date,
    fechaFin: Date,
  ): RangoFechaExperienciaLaboral {
    if (!fechaInicio)
      throw new FechaInicioExperienciaLaboralVacia(
        'La fecha de inicio de la experiencia laboral no debe estar vacía.',
      )

    if (!(fechaFin instanceof Date))
      throw new FechaInicioExperienciaLaboralInvalida(
        'La fecha de inicio de la experiencia laboral no es una fecha valida.',
      )

    if (!fechaInicio)
      throw new FechaFinExperienciaLaboralVacia(
        'La fecha final de la experiencia laboral no debe estar vacía.',
      )

    if (!(fechaFin instanceof Date))
      throw new FechaFinExperienciaLaboralInvalida(
        'La fecha final de la experiencia laboral no es una fecha valida.',
      )

    if (fechaInicio > fechaFin)
      throw new FechaFinNoMayorDeFechaInicioExperienciaLaboral(
        'La final de la experiencia laboral debe ser mayor a la fecha inicio.',
      )

    return new RangoFechaExperienciaLaboral(fechaInicio, fechaFin)
  }
}
