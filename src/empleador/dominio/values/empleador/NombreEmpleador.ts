import { ValueObject } from '../../../../comun/dominio/ValueObject'
import {
  NombreEmpleadorVacio,
  LongitudInvalidaNombreEmpleador,
} from '../../excepciones/empleador/NombreEmpleador.excepciones'

export class NombreEmpleador extends ValueObject {
  private constructor(private readonly nombre: string) {
    super()
  }

  public esIgual(nombreEmpleador: NombreEmpleador): boolean {
    return this.nombre == nombreEmpleador.nombre
  }

  public static crear(nombre: string): NombreEmpleador {
    // No debe ser vacio
    if (nombre == null || nombre == undefined || nombre == '')
      throw new NombreEmpleadorVacio(
        nombre,
        'El nombre del empleador o la empresa no puede estar vacío.',
      )

    const nombreEmpleador = new NombreEmpleador(nombre)

    // Debe contener al menos 4 caracteres
    if (nombre.length < 4)
      throw new LongitudInvalidaNombreEmpleador(
        nombreEmpleador,
        'El nombre del empleador o la empresa debe contener como mínimo 4 caracteres.',
      )
    // Debe contener como maximo 128 caracteres
    if (nombre.length > 128)
      throw new LongitudInvalidaNombreEmpleador(
        nombreEmpleador,
        'El nombre del empleador o la empresa debe contener como máximo 40 caracteres.',
      )

    // si no hay errores
    return nombreEmpleador
  }
}
