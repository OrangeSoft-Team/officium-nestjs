import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import { IdentificadorExperienciaLaboralVacio } from '../../excepciones/experienciaLaboral/IdentificadorExperienciaLaboral.excepciones'

export class IdentificadorExperienciaLaboral implements IValueObject {
  private constructor(private readonly id: string) {}

  public obtenerId() {
    return this.id
  }

  public esIgual(identificador: IdentificadorExperienciaLaboral): boolean {
    return this.id == identificador.id
  }

  public static crear(id: string): IdentificadorExperienciaLaboral {
    // No debe ser vacio
    if (id == null || id == undefined || id == '')
      throw new IdentificadorExperienciaLaboralVacio(
        'El identificador de la experiencia laboral no puede estar vacio.',
      )
    // Si no hay errores
    return new IdentificadorExperienciaLaboral(id)
  }
}
