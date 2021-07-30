import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import {
  EstatusEstudianteVacio,
  EstatusEstudianteInvalido,
} from '../../excepciones/estudiante/EstatusEstudiante.excepciones'

type ESTADOS = 'DISPONIBLE' | 'OCUPADO' | 'SUSPENDIDO'

export class EstatusEstudiante implements IValueObject {
  private constructor(private readonly estatus: ESTADOS) {}

  public obtenerEstatus() {
    return this.estatus
  }

  public esIgual(EstatusEstudiante: EstatusEstudiante): boolean {
    return this.estatus == EstatusEstudiante.estatus
  }

  public static crear(estatus: ESTADOS): EstatusEstudiante {
    if (!estatus)
      throw new EstatusEstudianteVacio(
        'El estatus del estudiante no debe estar vacío.',
      )

    if (!['DISPONIBLE', 'OCUPADO', 'SUSPENDIDO'].includes(estatus))
      throw new EstatusEstudianteInvalido(
        'El estatus del estudiante debe ser "DISPONIBLE", "OCUPADO" u "SUSPENDIDO".',
      )
    // Si no hay errores
    return new EstatusEstudiante(estatus)
  }
}
