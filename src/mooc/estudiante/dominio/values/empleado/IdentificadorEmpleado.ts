import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import { IdentificadorEmpleadoVacio } from '../../excepciones/empleado/IdentificadorEmpleado.excepciones'

export class IdentificadorEmpleado implements IValueObject {
  private constructor(private readonly id: string) {}

  public obtenerId() {
    return this.id
  }

  public esIgual(identificador: IdentificadorEmpleado): boolean {
    return this.id == identificador.id
  }

  public static crear(id: string): IdentificadorEmpleado {
    // No debe ser vacio
    if (id == null || id == undefined || id == '')
      throw new IdentificadorEmpleadoVacio(
        'El identificador del empleado no puede estar vacio.',
      )
    // Si no hay errores
    return new IdentificadorEmpleado(id)
  }
}
