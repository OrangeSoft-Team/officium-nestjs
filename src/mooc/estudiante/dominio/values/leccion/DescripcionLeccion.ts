import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import {
  DescripcionLeccionVacio,
  LongitudInvalidaDescripcionLeccion,
} from '../../excepciones/leccion/DescripcionLeccion.excepciones'

export class DescripcionLeccion implements IValueObject {
  private constructor(private readonly descripcion: string) {}

  public obtenerDescripcion() {
    return this.descripcion
  }

  public esIgual(descripcion: DescripcionLeccion): boolean {
    return this.descripcion == descripcion.obtenerDescripcion()
  }

  public static crear(descripcion: string): DescripcionLeccion {
    // No debe ser vacio
    if (descripcion == null || descripcion == undefined || descripcion == '')
      throw new DescripcionLeccionVacio(
        'La descripcion de la leccion no puede estar vacio.',
      )
    if (descripcion.length < 32)
      throw new LongitudInvalidaDescripcionLeccion(
        'La descripcion de la leccion no puede ser menor a 32 caracteres',
      )

    if (descripcion.length > 512)
      throw new LongitudInvalidaDescripcionLeccion(
        'La descripcion de la leccion no puede ser mayor a 512 caracteres',
      )

    // Si no hay errores
    return new DescripcionLeccion(descripcion)
  }
}
