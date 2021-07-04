import {
  CalleDireccionVacia,
  LongitudInvalidaCalleDireccion,
} from '../excepciones/CalleDireccion.excepciones'
import { ValueObject } from '../ValueObject'

export class CalleDireccion extends ValueObject {
  private constructor(private readonly calle: string) {
    super()
  }

  public obtenerCalle() {
    return this.calle
  }

  public esIgual(calleDireccion: CalleDireccion): boolean {
    return this.calle == calleDireccion.calle
  }

  public static crear(calle: string): CalleDireccion {
    if (calle == null || calle == undefined || calle == '')
      throw new CalleDireccionVacia(
        'La calle de la dirección no puede estar vacío.',
      )

    const calleDireccion = new CalleDireccion(calle)

    // Debe contener al menos 4 caracteres
    if (calle.length < 4)
      throw new LongitudInvalidaCalleDireccion(
        'La calle de la dirección debe contener como mínimo 4 caracteres.',
      )
    // Debe contener como maximo 256 caracteres
    if (calle.length > 256)
      throw new LongitudInvalidaCalleDireccion(
        'La calle de la dirección debe contener como máximo 256 caracteres.',
      )

    return calleDireccion
  }
}
