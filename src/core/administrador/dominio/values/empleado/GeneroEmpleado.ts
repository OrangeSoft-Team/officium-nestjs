import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import {
  GeneroEmpleadoVacio,
  GeneroEmpleadoInvalido,
} from '../../excepciones/empleado/GeneroEmpleado.excepciones'

type GENEROS = 'MASCULINO' | 'FEMENINO' | 'OTRO'

export class GeneroEmpleado implements IValueObject {
  private constructor(private readonly genero: GENEROS) {}

  public obtenerGenero() {
    return this.genero
  }

  public esIgual(genero: GeneroEmpleado): boolean {
    return this.genero == genero.genero
  }

  public static crear(genero: GENEROS): GeneroEmpleado {
    if (!genero)
      throw new GeneroEmpleadoVacio(
        'El género del empleado no debe estar vacío.',
      )

    if (!['MASCULINO', 'FEMENINO', 'OTRO'].includes(genero))
      throw new GeneroEmpleadoInvalido(
        'El género del empleado debe ser "MASCULINO", "FEMENINO" u "OTRO".',
      )
    // Si no hay errores
    return new GeneroEmpleado(genero)
  }
}
