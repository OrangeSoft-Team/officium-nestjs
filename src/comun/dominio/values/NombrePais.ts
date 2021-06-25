import {
  NombrePaisVacio,
  LongitudInvalidaNombrePais,
} from '../excepciones/NombrePais.excepciones'
import { ValueObject } from '../ValueObject'

export class NombrePais extends ValueObject {
  private constructor(private readonly nombre: string) {
    super()
  }

  public esIgual(nombrePais: NombrePais): boolean {
    return this.nombre == nombrePais.nombre
  }

  public static crear(nombre: string): NombrePais {
    // No debe ser vacio
    if (nombre == null || nombre == undefined || nombre == '')
      throw new NombrePaisVacio(
        nombre,
        'El nombre del país no puede estar vacío.',
      )

    const nombrePais = new NombrePais(nombre)

    // Debe contener al menos 2 caracteres
    if (nombre.length < 2)
      throw new LongitudInvalidaNombrePais(
        nombrePais,
        'El nombre del país debe contener como mínimo 2 caracteres.',
      )
    // Debe contener como maximo 128 caracteres
    if (nombre.length > 128)
      throw new LongitudInvalidaNombrePais(
        nombrePais,
        'El nombre del país debe contener como máximo 128 caracteres.',
      )
    // Si no hay errores
    return nombrePais
  }
}
