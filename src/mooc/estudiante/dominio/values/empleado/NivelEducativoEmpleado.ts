import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import {
  NivelEducativoEmpleadoVacio,
  NivelEducativoEmpleadoInvalido,
} from '../../excepciones/empleado/NivelEducativoEmpleado.excepciones'

type NIVELES_EDUCATIVOS =
  | 'NINGUNO'
  | 'PRIMARIA'
  | 'SECUNDARIA'
  | 'TECNICO'
  | 'PREGRADO'
  | 'POSTGRADO'
  | 'DOCTORADO'
  | 'MASTER'

export class NivelEducativoEmpleado implements IValueObject {
  private constructor(private readonly nivel: NIVELES_EDUCATIVOS) {}

  public obtenerNivel() {
    return this.nivel
  }

  public esIgual(nivelEducativoEmpleado: NivelEducativoEmpleado): boolean {
    return this.nivel == nivelEducativoEmpleado.nivel
  }

  public static crear(nivel: NIVELES_EDUCATIVOS): NivelEducativoEmpleado {
    if (!nivel)
      throw new NivelEducativoEmpleadoVacio(
        'El nivel educativo del empleado no debe estar vacío.',
      )

    if (
      ![
        'NINGUNO',
        'PRIMARIA',
        'SECUNDARIA',
        'TECNICO',
        'PREGRADO',
        'POSTGRADO',
        'DOCTORADO',
        'MASTER',
      ].includes(nivel)
    )
      throw new NivelEducativoEmpleadoInvalido(
        'El nivel educativo del empleado debe ser "NINGUNO", "PRIMARIA", "SECUNDARIA", "TECNICO", "PREGRADO", "POSTGRADO", "DOCTORADO" o "MASTER".',
      )
    // Si no hay errores
    return new NivelEducativoEmpleado(nivel)
  }
}
