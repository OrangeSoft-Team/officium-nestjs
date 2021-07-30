import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import {
  ContenidoLeccionVacio,
  LongitudInvalidaContenidoLeccion,
} from '../../excepciones/leccion/ContenidoLeccion.excepciones'

export class ContenidoLeccion implements IValueObject {
  private constructor(private readonly contenido: string) {}

  public obtenerContenido() {
    return this.contenido
  }

  public esIgual(contenido: ContenidoLeccion): boolean {
    return this.contenido == contenido.obtenerContenido()
  }

  public static crear(contenido: string): ContenidoLeccion {
    // No debe ser vacio
    if (contenido == null || contenido == undefined || contenido == '')
      throw new ContenidoLeccionVacio(
        'El contenido de la leccion no puede estar vacio.',
      )
    if (contenido.length < 64)
      throw new LongitudInvalidaContenidoLeccion(
        'El contenido de la leccion no puede ser menor a 64 caracteres',
      )

    if (contenido.length > 1024)
      throw new LongitudInvalidaContenidoLeccion(
        'El contenido de la leccion no puede ser mayor a 1024 caracteres',
      )

    // Si no hay errores
    return new ContenidoLeccion(contenido)
  }
}
