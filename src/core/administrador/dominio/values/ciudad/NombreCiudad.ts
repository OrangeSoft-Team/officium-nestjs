import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import {
  NombreCiudadVacio,
  LongitudInvalidaNombreCiudad,
} from '../../excepciones/ciudad/NombreCiudad.excepciones'

export class NombreCiudad implements IValueObject {
  private constructor(private readonly nombre: string) {}

  public obtenerNombre() {
    return this.nombre
  }

  public esIgual(nombreCiudad: NombreCiudad): boolean {
    return this.nombre == nombreCiudad.nombre
  }

  public static crear(nombre: string): NombreCiudad {
    if (nombre == null || nombre == undefined || nombre == '')
      throw new NombreCiudadVacio(
        'El nombre de la ciudad no puede estar vacio.',
      )

    if (nombre.length < 2)
      throw new LongitudInvalidaNombreCiudad(
        'El nombre de la ciudad debe contener como mínimo 2 caracteres.',
      )

    if (nombre.length > 128)
      throw new LongitudInvalidaNombreCiudad(
        'El nombre de la ciudad debe contener como máximo 128 caracteres.',
      )
    // Si no hay errores
    return new NombreCiudad(nombre)
  }
}
