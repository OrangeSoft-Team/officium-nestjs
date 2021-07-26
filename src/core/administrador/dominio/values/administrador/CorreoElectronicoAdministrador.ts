import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import {
  CorreoElectronicoAdministradorVacio,
  LongitudInvalidaCorreoElectronicoAdministrador,
  FormatoIncorrectoCorreoElectronicoAdministrador,
} from '../../excepciones/administrador/CorreoElectronicoAdministrador.excepciones'

export class CorreoElectronicoAdministrador implements IValueObject {
  private constructor(private readonly correo: string) {}

  public obtenerCorreo() {
    return this.correo
  }

  public esIgual(correoElectronico: CorreoElectronicoAdministrador): boolean {
    return this.correo == correoElectronico.correo
  }

  public static crear(correo: string): CorreoElectronicoAdministrador {
    if (!correo)
      throw new CorreoElectronicoAdministradorVacio(
        'El correo electrónico del administrador no puede estar vacío.',
      )

    if (correo.length < 3)
      throw new LongitudInvalidaCorreoElectronicoAdministrador(
        'El correo electrónico del administrador debe contener como mínimo 4 caracteres.',
      )

    if (correo.length > 320)
      throw new LongitudInvalidaCorreoElectronicoAdministrador(
        'El correo electrónico del administrador debe contener como máximo 320 caracteres.',
      )

    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        correo,
      )
    )
      throw new FormatoIncorrectoCorreoElectronicoAdministrador(
        'El correo electrónico del administrador debe tener un formato valido, del tipo nombre@dominio.',
      )

    // si no hay errores
    return new CorreoElectronicoAdministrador(correo)
  }
}
