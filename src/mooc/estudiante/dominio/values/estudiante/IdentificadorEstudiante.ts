import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import { IdentificadorEstudianteVacio } from '../../excepciones/estudiante/IdentificadorEstudiante.excepciones'

export class IdentificadorEstudiante implements IValueObject {
  private constructor(private readonly id: string) {}

  public obtenerId() {
    return this.id
  }

  public esIgual(identificador: IdentificadorEstudiante): boolean {
    return this.id == identificador.id
  }

  public static crear(id: string): IdentificadorEstudiante {
    // No debe ser vacio
    if (id == null || id == undefined || id == '')
      throw new IdentificadorEstudianteVacio(
        'El identificador del estudiante no puede estar vacio.',
      )
    // Si no hay errores
    return new IdentificadorEstudiante(id)
  }
}
