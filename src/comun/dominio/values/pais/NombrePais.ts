import {
  NombrePaisVacio,
  LongitudInvalidaNombrePais,
} from '../../excepciones/pais/NombrePais.excepciones'
import { IValueObject } from '../../IValueObject'

export class NombrePais implements IValueObject {
  private constructor(private readonly nombre: string) {}

  public obtenerNombre() {
    return this.nombre
  }

  public esIgual(nombrePais: NombrePais): boolean {
    return this.nombre == nombrePais.nombre
  }

  public static crear(nombre: string): NombrePais {
    if (nombre == null || nombre == undefined || nombre == '')
      throw new NombrePaisVacio('El nombre del país no puede estar vacio.')

    if (nombre.length < 2)
      throw new LongitudInvalidaNombrePais(
        'El nombre del país debe contener como mínimo 2 caracteres.',
      )

    if (nombre.length > 128)
      throw new LongitudInvalidaNombrePais(
        'El nombre del país debe contener como máximo 128 caracteres.',
      )
    // Si no hay errores
    return new NombrePais(nombre)
  }
}
