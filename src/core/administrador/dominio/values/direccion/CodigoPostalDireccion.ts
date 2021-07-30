import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import {
  CodigoPostalDireccionVacio,
  LongitudInvalidaCodigoPostalDireccion,
} from '../../excepciones/direccion/CodigoPostalDireccion.excepciones'

export class CodigoPostalDireccion implements IValueObject {
  private constructor(private readonly codigo: string) {}

  public obtenerCodigo() {
    return this.codigo
  }

  public esIgual(codigoPostal: CodigoPostalDireccion): boolean {
    return this.codigo == codigoPostal.codigo
  }

  public static crear(codigo: string): CodigoPostalDireccion {
    if (!codigo)
      throw new CodigoPostalDireccionVacio(
        'El código postal de la dirección no puede estar vacía.',
      )

    if (codigo.length < 1)
      throw new LongitudInvalidaCodigoPostalDireccion(
        'El código postal de la dirección debe contener como mínimo 1 caracteres.',
      )

    if (codigo.length > 10)
      throw new LongitudInvalidaCodigoPostalDireccion(
        'El código postal de la dirección debe contener como máximo 10 caracteres.',
      )

    // si no hay errores
    return new CodigoPostalDireccion(codigo)
  }
}
