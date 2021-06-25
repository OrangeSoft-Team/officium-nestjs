import {
  LongitudInvalidaNombreCiudad,
  NombreCiudadVacio,
} from '../excepciones/NombreCiudad.excepciones'
import { ValueObject } from '../ValueObject'

export class NombreCiudad extends ValueObject {
  private constructor(private readonly nombre: string) {
    super()
  }

  public esIgual(nombreCiudad: NombreCiudad): boolean {
    return this.nombre == nombreCiudad.nombre
  }

  public static crear(nombre: string): NombreCiudad {
    // No debe ser vacio
    if (nombre == null || nombre == undefined || nombre == '')
      throw new NombreCiudadVacio(
        nombre,
        'El nombre de la ciudad no puede estar vacío.',
      )

    const nombreCiudad = new NombreCiudad(nombre)

    // Debe contener al menos 2 caracteres
    if (nombre.length < 2)
      throw new LongitudInvalidaNombreCiudad(
        nombreCiudad,
        'El nombre de la ciudad debe contener como mínimo 2 caracteres.',
      )
    // Debe contener como maximo 128 caracteres
    if (nombre.length > 128)
      throw new LongitudInvalidaNombreCiudad(
        nombreCiudad,
        'El nombre de la ciudad debe contener como máximo 128 caracteres.',
      )
    // Si no hay errores
    return nombreCiudad
  }
}
