import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import {
  NombreEmpresaVacio,
  LongitudInvalidaNombreEmpresa,
} from '../../excepciones/empresa/NombreEmpresa.excepciones'

export class NombreEmpresa implements IValueObject {
  private constructor(private readonly nombre: string) {}

  public obtenerNombre() {
    return this.nombre
  }

  public esIgual(nombreEmpresa: NombreEmpresa): boolean {
    return this.nombre == nombreEmpresa.nombre
  }

  public static crear(nombre: string): NombreEmpresa {
    if (!nombre)
      throw new NombreEmpresaVacio(
        'El nombre de la empresa no puede estar vacío.',
      )

    if (nombre.length < 4)
      throw new LongitudInvalidaNombreEmpresa(
        'El nombre de la empresa debe contener como mínimo 4 caracteres.',
      )

    if (nombre.length > 128)
      throw new LongitudInvalidaNombreEmpresa(
        'El nombre de la empresa debe contener como máximo 128 caracteres.',
      )

    return new NombreEmpresa(nombre)
  }
}
