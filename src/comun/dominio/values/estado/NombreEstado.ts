import {
  NombreEstadoVacio,
  LongitudInvalidaNombreEstado,
} from '../../excepciones/estado/NombreEstado.excepciones'
import { IValueObject } from '../../IValueObject'

export class NombreEstado implements IValueObject {
  private constructor(private readonly nombre: string) {}

  public obtenerNombre() {
    return this.nombre
  }

  public esIgual(nombreEstado: NombreEstado): boolean {
    return this.nombre == nombreEstado.nombre
  }

  public static crear(nombre: string): NombreEstado {
    if (nombre == null || nombre == undefined || nombre == '')
      throw new NombreEstadoVacio('El nombre del estado no puede estar vacio.')

    if (nombre.length < 2)
      throw new LongitudInvalidaNombreEstado(
        'El nombre del estado debe contener como mínimo 2 caracteres.',
      )

    if (nombre.length > 128)
      throw new LongitudInvalidaNombreEstado(
        'El nombre del estado debe contener como máximo 128 caracteres.',
      )
    // Si no hay errores
    return new NombreEstado(nombre)
  }
}
