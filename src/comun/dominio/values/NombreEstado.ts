import {
  NombreEstadoVacio,
  LongitudInvalidaNombreEstado,
} from '../excepciones/NombreEstado.excepciones'
import { ValueObject } from '../ValueObject'

export class NombreEstado extends ValueObject {
  private constructor(private readonly nombre: string) {
    super()
  }

  public esIgual(nombreEstado: NombreEstado): boolean {
    return this.nombre == nombreEstado.nombre
  }

  public static crear(nombre: string): NombreEstado {
    // No debe ser vacio
    if (nombre == null || nombre == undefined || nombre == '')
      throw new NombreEstadoVacio(
        nombre,
        'El nombre del estado no puede estar vacío.',
      )

    const nombreEstado = new NombreEstado(nombre)

    // Debe contener al menos 2 caracteres
    if (nombre.length < 2)
      throw new LongitudInvalidaNombreEstado(
        nombreEstado,
        'El nombre del estado debe contener como mínimo 2 caracteres.',
      )
    // Debe contener como maximo 128 caracteres
    if (nombre.length > 128)
      throw new LongitudInvalidaNombreEstado(
        nombreEstado,
        'El nombre del estado debe contener como máximo 128 caracteres.',
      )
    // Si no hay errores
    return nombreEstado
  }
}
