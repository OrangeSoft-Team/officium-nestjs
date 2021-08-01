import {
  CategoriaHabilidadVacio,
  LongitudInvalidaCategoriaHabilidad,
} from '../../excepciones/habilidad/CategoriaHabilidad.excepciones'
import { IValueObject } from '../../IValueObject'

export class CategoriaHabilidad implements IValueObject {
  private constructor(private readonly categoria: string) {}

  public obtenerCategoria() {
    return this.categoria
  }

  public esIgual(categoriaHabilidad: CategoriaHabilidad): boolean {
    return this.categoria == categoriaHabilidad.categoria
  }

  public static crear(categoria: string): CategoriaHabilidad {
    if (!categoria)
      throw new CategoriaHabilidadVacio(
        'La categoría de la habilidad no puede estar vacía.',
      )

    if (categoria.length < 4)
      throw new LongitudInvalidaCategoriaHabilidad(
        'La categoría de la habilidad debe contener como mínimo 4 caracteres.',
      )

    if (categoria.length > 64)
      throw new LongitudInvalidaCategoriaHabilidad(
        'La categoría de la habilidad debe contener como máximo 64 caracteres.',
      )

    return new CategoriaHabilidad(categoria)
  }
}
