import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import { NombreHabilidadVacio, LongitudInvalidaNombreHabilidad } from '../../excepciones/habilidad/NombreHabilidad.excepciones'

export class NombreHabilidad implements IValueObject {
  private constructor(private readonly habilidad: string) {}

  public obtenerNombreHabilidad() {
    return this.habilidad
  }

  public esIgual(identificador: NombreHabilidad): boolean {
    return this.habilidad == identificador.obtenerNombreHabilidad()
  }

  public static crear(habilidad: string): NombreHabilidad {
    // No debe ser vacio
    if (habilidad == null || habilidad == undefined || habilidad == '')
      throw new NombreHabilidadVacio(
        'La habilidad no puede estar vacio.',
      )

      if (habilidad.length <= 4)
      throw new LongitudInvalidaNombreHabilidad(
          'La nombre no puede ser menor o igual a 4 caracteres'
      )

    if (habilidad.length > 64)
    throw new LongitudInvalidaNombreHabilidad(
      'La nombre no puede ser mayor a 64 caracteres'
  )
    // Si no hay errores
    return new NombreHabilidad(habilidad)
  }
}