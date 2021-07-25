import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import { LongitudInvalidaCalleDosDireccion } from '../../excepciones/direccion/CalleDosDireccion.excepciones'

export class CalleDosDireccion implements IValueObject {
  private constructor(private readonly calle: string) {}

  public obtenerCalle() {
    return this.calle
  }

  public esIgual(calleDos: CalleDosDireccion): boolean {
    return this.calle == calleDos.calle
  }

  public static crear(calle: string): CalleDosDireccion {
    if (calle) {
      if (calle.length < 2)
        throw new LongitudInvalidaCalleDosDireccion(
          'La calle dos de la dirección debe contener como mínimo 2 caracteres.',
        )

      if (calle.length > 128)
        throw new LongitudInvalidaCalleDosDireccion(
          'La calle dos de la dirección debe contener como máximo 128 caracteres.',
        )
    }

    // si no hay errores
    return new CalleDosDireccion(calle)
  }
}
