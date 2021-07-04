import { ValueObject } from 'src/comun/dominio/ValueObject'
import {
  GeneroAdministradorInvalido,
  GeneroAdministradorVacio,
} from '../../excepciones/administrador/GeneroAdministrador.excepciones'

type Generos = 'masculino' | 'femenino' | 'otro'

export class GeneroAdministrador extends ValueObject {
  private constructor(private readonly genero: Generos) {
    super()
  }

  public esIgual(generoAdministrador: GeneroAdministrador): boolean {
    return this.genero == generoAdministrador.genero
  }

  public static crear(genero: Generos): GeneroAdministrador {
    // el Genero no debe ser vacio
    if (genero == null || genero == undefined)
      throw new GeneroAdministradorVacio(
        'El Genero del Administrador no debe estar vacío.',
      )

    const generoEmpleado = new GeneroAdministrador(genero)

    // el Genero debe ser de los siguientes valores
    if (!['masculino', 'femenino', 'otro'].includes(genero))
      throw new GeneroAdministradorInvalido(
        'El Genero del Administrador debe ser "masculino", "femenino" u "otro".',
      )

    return generoEmpleado
  }
}
