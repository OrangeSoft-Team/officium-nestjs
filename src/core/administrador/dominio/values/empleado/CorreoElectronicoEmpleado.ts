import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import {
  CorreoElectronicoEmpleadoVacio,
  LongitudInvalidaCorreoElectronicoEmpleado,
  FormatoIncorrectoCorreoElectronicoEmpleado,
} from '../../excepciones/empleado/CorreoElectronicoEmpleado.excepciones'

export class CorreoElectronicoEmpleado implements IValueObject {
  private constructor(private readonly correo: string) {}

  public obtenerCorreo() {
    return this.correo
  }

  public esIgual(correoElectronico: CorreoElectronicoEmpleado): boolean {
    return this.correo == correoElectronico.correo
  }

  public static crear(correo: string): CorreoElectronicoEmpleado {
    if (!correo)
      throw new CorreoElectronicoEmpleadoVacio(
        'El correo electrónico del empleado no puede estar vacío.',
      )

    if (correo.length < 3)
      throw new LongitudInvalidaCorreoElectronicoEmpleado(
        'El correo electrónico del empleado debe contener como mínimo 4 caracteres.',
      )

    if (correo.length > 320)
      throw new LongitudInvalidaCorreoElectronicoEmpleado(
        'El correo electrónico del empleado debe contener como máximo 320 caracteres.',
      )

    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        correo,
      )
    )
      throw new FormatoIncorrectoCorreoElectronicoEmpleado(
        'El correo electrónico del empleado debe tener un formato valido, del tipo nombre@dominio.',
      )

    // si no hay errores
    return new CorreoElectronicoEmpleado(correo)
  }
}
