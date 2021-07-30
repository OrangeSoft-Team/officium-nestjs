import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import {
  NombreHabilidadVacio,
  LongitudInvalidaNombreHabilidad,
} from '../../excepciones/habilidad/NombreHabilidad.excepciones'

export class NombreHabilidad implements IValueObject {
  private constructor(private readonly nombre: string) {}

  public obtenerNombre() {
    return this.nombre
  }

  public esIgual(nombreHabilidad: NombreHabilidad): boolean {
    return this.nombre == nombreHabilidad.nombre
  }

  public static crear(nombre: string): NombreHabilidad {
    if (!nombre)
      throw new NombreHabilidadVacio(
        'El nombre de la habilidad no puede estar vacío.',
      )

    if (nombre.length < 4)
      throw new LongitudInvalidaNombreHabilidad(
        'El nombre de la habilidad debe contener como mínimo 4 caracteres.',
      )

    if (nombre.length > 64)
      throw new LongitudInvalidaNombreHabilidad(
        'El nombre de la habilidad debe contener como máximo 64 caracteres.',
      )

    return new NombreHabilidad(nombre)
  }
}
