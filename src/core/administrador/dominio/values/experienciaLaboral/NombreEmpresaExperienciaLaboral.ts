import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import {
  NombreEmpresaExperienciaLaboralVacio,
  LongitudInvalidaNombreEmpresaExperienciaLaboral,
} from '../../excepciones/experienciaLaboral/NombreEmpresaExperienciaLaboral.excepciones'

export class NombreEmpresaExperienciaLaboral implements IValueObject {
  private constructor(private readonly nombre: string) {}

  public obtenerNombre() {
    return this.nombre
  }

  public esIgual(nombreEmpresa: NombreEmpresaExperienciaLaboral): boolean {
    return this.nombre == nombreEmpresa.nombre
  }

  public static crear(nombre: string): NombreEmpresaExperienciaLaboral {
    if (!nombre)
      throw new NombreEmpresaExperienciaLaboralVacio(
        'El nombre de la empresa de la experiencia laboral no puede estar vacío.',
      )

    if (nombre.length < 4)
      throw new LongitudInvalidaNombreEmpresaExperienciaLaboral(
        'El nombre de la empresa de la experiencia laboral debe contener como mínimo 4 caracteres.',
      )

    if (nombre.length > 128)
      throw new LongitudInvalidaNombreEmpresaExperienciaLaboral(
        'El nombre de la empresa de la experiencia laboral debe contener como máximo 128 caracteres.',
      )

    return new NombreEmpresaExperienciaLaboral(nombre)
  }
}
