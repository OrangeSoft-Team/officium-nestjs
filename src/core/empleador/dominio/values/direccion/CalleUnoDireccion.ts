import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import {
  CalleUnoDireccionVacia,
  LongitudInvalidaCalleUnoDireccion,
} from '../../excepciones/direccion/CalleUnoDireccion.excepciones'

export class CalleUnoDireccion implements IValueObject {
  private constructor(private readonly calle: string) {}

  public obtenerCalle() {
    return this.calle
  }

  public esIgual(calleUno: CalleUnoDireccion): boolean {
    return this.calle == calleUno.calle
  }

  public static crear(calle: string): CalleUnoDireccion {
    if (!calle)
      throw new CalleUnoDireccionVacia(
        'La calle uno de la dirección no puede estar vacía.',
      )

    if (calle.length < 2)
      throw new LongitudInvalidaCalleUnoDireccion(
        'La calle uno de la dirección debe contener como mínimo 2 caracteres.',
      )

    if (calle.length > 128)
      throw new LongitudInvalidaCalleUnoDireccion(
        'La calle uno de la dirección debe contener como máximo 128 caracteres.',
      )

    // si no hay errores
    return new CalleUnoDireccion(calle)
  }
}
