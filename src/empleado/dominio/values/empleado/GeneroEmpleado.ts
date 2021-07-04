import { ValueObject } from 'src/comun/dominio/ValueObject'
import {
  GeneroEmpleadoInvalido,
  GeneroEmpleadoVacio,
} from '../../excepciones/empleado/GeneroEmpleado.excepciones'

type Generos = 'masculino' | 'femenino' | 'otro'

export class GeneroEmpleado extends ValueObject {
  private constructor(private readonly genero: Generos) {
    super()
  }

  public esIgual(generoEmpleado: GeneroEmpleado): boolean {
    return this.genero == generoEmpleado.genero
  }

  public static crear(genero: Generos): GeneroEmpleado {
    // el Genero no debe ser vacio
    if (genero == null || genero == undefined)
      throw new GeneroEmpleadoVacio(
        'El Genero del empleado no debe estar vacío.',
      )

    const generoEmpleado = new GeneroEmpleado(genero)

    // el Genero debe ser de los siguientes valores
    if (!['masculino', 'femenino', 'otro'].includes(genero))
      throw new GeneroEmpleadoInvalido(
        'El Genero del empleado debe ser "masculino", "femenino" u "otro".',
      )

    return generoEmpleado
  }
}
