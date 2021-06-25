import {
  CorreoElectronicoVacio,
  FormatoInvalidoCorreoElectronico,
  LongitudInvalidaCorreoElectronico,
} from '../excepciones/CorreoElectronico.excepciones'
import { ValueObject } from '../ValueObject'

export class CorreoElectronico extends ValueObject {
  private constructor(private readonly correo: string) {
    super()
  }

  public esIgual(correoElectronico: CorreoElectronico): boolean {
    return this.correo == correoElectronico.correo
  }

  public crear(correo: string): CorreoElectronico {
    // No debe ser vacio
    if (correo == null || correo == undefined || correo == '')
      throw new CorreoElectronicoVacio(
        correo,
        'El correo electrónico no puede estar vacío.',
      )

    const correoElectronico = new CorreoElectronico(correo)

    // Debe contener al menos 3 caracteres
    if (correo.length < 3)
      throw new LongitudInvalidaCorreoElectronico(
        correoElectronico,
        'El correo electrónico debe contener como mínimo 4 caracteres.',
      )
    // Debe contener como maximo 320 caracteres
    if (correo.length > 320)
      throw new LongitudInvalidaCorreoElectronico(
        correoElectronico,
        'El correo electrónico debe contener como máximo 40 caracteres.',
      )
    // Debe ser un formato valido
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        correo,
      )
    ) {
      throw new FormatoInvalidoCorreoElectronico(
        correoElectronico,
        'El correo electrónico debe tener un formato valido, del tipo nombre@dominio.',
      )
    }
    // Si no hay errores
    return correoElectronico
  }
}
