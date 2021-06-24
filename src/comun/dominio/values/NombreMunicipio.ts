import {
  LongitudInvalidaNombreMunicipio,
  NombreMunicipioVacio,
} from '../excepciones/NombreMunicipio.excepciones'
import { ValueObject } from '../ValueObject'

export class NombreMunicipio extends ValueObject {
  private constructor(private readonly nombre: string) {
    super()
  }

  public esIgual(nombreMunicipio: NombreMunicipio): boolean {
    return this.nombre == nombreMunicipio.nombre
  }

  public static crear(nombre: string): NombreMunicipio {
    // No debe ser vacio
    if (nombre == null || nombre == undefined || nombre == '')
      throw new NombreMunicipioVacio(
        nombre,
        'El nombre del municipio no puede estar vacío.',
      )

    const nombreMunicipio = new NombreMunicipio(nombre)

    // Debe contener al menos 2 caracteres
    if (nombre.length < 2)
      throw new LongitudInvalidaNombreMunicipio(
        nombreMunicipio,
        'El nombre del municipio debe contener como mínimo 2 caracteres.',
      )
    // Debe contener como maximo 128 caracteres
    if (nombre.length > 128)
      throw new LongitudInvalidaNombreMunicipio(
        nombreMunicipio,
        'El nombre del municipio debe contener como máximo 128 caracteres.',
      )
    // Si no hay errores
    return nombreMunicipio
  }
}
