import { ValueObject } from '../../../../comun/dominio/ValueObject'
import {
  TurnoOfertaVacio,
  TurnoOfertaInvalido,
} from '../../excepciones/oferta/TurnoOferta.excepciones'

type TURNOS = 'diurno' | 'nocturno' | 'mixto'
export class TurnoOferta extends ValueObject {
  private constructor(private readonly turno: TURNOS) {
    super()
  }

  public obtenerTurno() {
    return this.turno
  }

  public esIgual(turnoTrabajo: TurnoOferta): boolean {
    return this.turno == turnoTrabajo.turno
  }

  public static crear(turno: TURNOS): TurnoOferta {
    // el turno no debe ser vacio
    if (turno == null || turno == undefined)
      throw new TurnoOfertaVacio(
        turno,
        'El turno de trabajo de la oferta laboral no debe estar vacío.',
      )

    const turnoOferta = new TurnoOferta(turno)

    // el turno debe ser de los siguientes valores
    if (!['diurno', 'nocturno', 'mixto'].includes(turno))
      throw new TurnoOfertaInvalido(
        turnoOferta,
        'El turno de trabajo de la oferta laboral debe ser "diurno", "nocturno" o "mixto".',
      )

    return turnoOferta
  }
}
