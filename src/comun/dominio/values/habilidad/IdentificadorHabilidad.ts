import { IdentificadorHabilidadVacio } from '../../excepciones/habilidad/IdentificadorHabilidad.excepciones'
import { IValueObject } from '../../IValueObject'

export class IdentificadorHabilidad implements IValueObject {
  private constructor(private readonly id: string) {}

  public obtenerId() {
    return this.id
  }

  public esIgual(identificador: IdentificadorHabilidad): boolean {
    return this.id == identificador.id
  }

  public static crear(id: string): IdentificadorHabilidad {
    // No debe ser vacio
    if (id == null || id == undefined || id == '')
      throw new IdentificadorHabilidadVacio(
        'El identificador de la habilidad no puede estar vacio.',
      )
    // Si no hay errores
    return new IdentificadorHabilidad(id)
  }
}
