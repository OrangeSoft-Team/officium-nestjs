import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import {
  CorreoElectronicoEmpleadoVacio,
  FormatoIncorrectoCorreoElectronicoEstudiante,
  LongitudInvalidaCorreoElectronicoEstudiante,
} from '../../excepciones/estudiante/CorreoElectronicoEstudiante.excepciones'

export class CorreoElectronicoEstudiante implements IValueObject {
  private constructor(private readonly correo: string) {}

  public obtenerCorreo() {
    return this.correo
  }

  public esIgual(correoElectronico: CorreoElectronicoEstudiante): boolean {
    return this.correo == correoElectronico.correo
  }

  public static crear(correo: string): CorreoElectronicoEstudiante {
    if (!correo)
      throw new CorreoElectronicoEmpleadoVacio(
        'El correo electrónico del estudiante no puede estar vacío.',
      )

    if (correo.length < 3)
      throw new LongitudInvalidaCorreoElectronicoEstudiante(
        'El correo electrónico del estudiante debe contener como mínimo 4 caracteres.',
      )

    if (correo.length > 320)
      throw new LongitudInvalidaCorreoElectronicoEstudiante(
        'El correo electrónico del estudiante debe contener como máximo 320 caracteres.',
      )

    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        correo,
      )
    )
      throw new FormatoIncorrectoCorreoElectronicoEstudiante(
        'El correo electrónico del estudiante debe tener un formato valido, del tipo nombre@dominio.',
      )

    // si no hay errores
    return new CorreoElectronicoEstudiante(correo)
  }
}
