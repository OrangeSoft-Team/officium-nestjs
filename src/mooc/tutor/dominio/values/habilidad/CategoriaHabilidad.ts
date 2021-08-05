import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import {
  CategoriaHabilidadVacio,
  LongitudInvalidaCategoriaHabilidad,
} from '../../excepciones/habilidad/CategoriaHabilidad.excepciones'

export class CategoriaHabilidad implements IValueObject {
  private constructor(private readonly categoria: string) {}

  public obtenerCategoriaHabilidad() {
    return this.categoria
  }

  public esIgual(identificador: CategoriaHabilidad): boolean {
    return this.categoria == identificador.obtenerCategoriaHabilidad()
  }

  public static crear(categoria: string): CategoriaHabilidad {
    
    // Valida que no haya errores
    if (categoria == null || categoria == undefined || categoria == '')
      throw new CategoriaHabilidadVacio('La categoria no puede estar vacia.')

    if (categoria.length <= 4)
      throw new LongitudInvalidaCategoriaHabilidad(
        'La categoria no puede ser menor o igual a 4 caracteres',
      )

    if (categoria.length > 64)
      throw new LongitudInvalidaCategoriaHabilidad(
        'La categoria no puede ser mayor a 64 caracteres',
      )
    // Si no hay errores
    return new CategoriaHabilidad(categoria)
  }
}
