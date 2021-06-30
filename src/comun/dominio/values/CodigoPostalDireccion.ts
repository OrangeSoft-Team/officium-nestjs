import {
  CodigoPostalDireccionVacia,
  LongitudInvalidaCodigoPostalDireccion,
} from '../excepciones/CodigoPostalDireccion.excepciones'
import { ValueObject } from '../ValueObject'

export class CodigoPostalDireccion extends ValueObject {
  private constructor(private readonly codigo: string) {
    super()
  }

  obtenerCodigoPostal(){
    this.codigo
  }

  public esIgual(codigoPostalDireccion: CodigoPostalDireccion): boolean {
    return this.codigo == codigoPostalDireccion.codigo
  }

  public static crear(codigo: string): CodigoPostalDireccion {
    if (codigo == null || codigo == undefined || codigo == '')
      throw new CodigoPostalDireccionVacia(
        codigo,
        'El código postal de la dirección no puede estar vacío.',
      )

    const codigoPostalDireccion = new CodigoPostalDireccion(codigo)

    // Debe contener al menos 1 caracter
    if (codigo.length < 1)
      throw new LongitudInvalidaCodigoPostalDireccion(
        codigoPostalDireccion,
        'El código postal de la dirección debe contener como mínimo 4 caracteres.',
      )
    // Debe contener como maximo 10 caracteres
    if (codigo.length > 10)
      throw new LongitudInvalidaCodigoPostalDireccion(
        codigoPostalDireccion,
        'El código postal de la dirección debe contener como máximo 10 caracteres.',
      )
    return codigoPostalDireccion
  }
}
