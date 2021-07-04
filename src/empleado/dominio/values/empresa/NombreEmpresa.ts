import { ValueObject } from '../../../../comun/dominio/ValueObject'
import {
  NombreEmpresaVacio,
  LongitudInvalidaNombreEmpresa,
} from '../../excepciones/empresa/NombreEmpresa.excepciones'

export class NombreEmpresa extends ValueObject {
  private constructor(private readonly nombre: string) {
    super()
  }

  public esIgual(nombreEmpresa: NombreEmpresa): boolean {
    return this.nombre == nombreEmpresa.nombre
  }

  public obtenerNombre(): string {
    return this.nombre
  }

  public static crear(nombre: string): NombreEmpresa {
    // No debe ser vacio
    if (nombre == null || nombre == undefined || nombre == '')
      throw new NombreEmpresaVacio(
        'El nombre de la empresa o la empresa no puede estar vacío.',
      )

    const nombreEmpresa = new NombreEmpresa(nombre)

    // Debe contener al menos 4 caracteres
    if (nombre.length < 4)
      throw new LongitudInvalidaNombreEmpresa(
        'El nombre de la empresa o la empresa debe contener como mínimo 4 caracteres.',
      )
    // Debe contener como maximo 128 caracteres
    if (nombre.length > 128)
      throw new LongitudInvalidaNombreEmpresa(
        'El nombre de la empresa o la empresa debe contener como máximo 40 caracteres.',
      )

    // si no hay errores
    return nombreEmpresa
  }
}
