import { ValueObject } from 'src/comun/dominio/ValueObject'
import {
  LongitudInvalidaNombreAdministrador,
  NombresAdministradorVacio,
} from '../../excepciones/administrador/NombreCompletoAdministrador.excepciones'

export interface Nombres {
  primerNombre: string
  segundoNombre?: string
  primerApellido: string
  segundoApellido: string
}

export class NombreCompletoAdministrador extends ValueObject {
  private constructor(private readonly nombres: Nombres) {
    super()
  }

  public esIgual(
    NombreCompletoAdministrador: NombreCompletoAdministrador,
  ): boolean {
    return (
      this.nombres.primerNombre ==
        NombreCompletoAdministrador.nombres.primerNombre &&
      this.nombres.segundoNombre ==
        NombreCompletoAdministrador.nombres.segundoNombre &&
      this.nombres.primerApellido ==
        NombreCompletoAdministrador.nombres.primerApellido &&
      this.nombres.segundoApellido ==
        NombreCompletoAdministrador.nombres.segundoApellido
    )
  }

  public static crear(nombres: Nombres): NombreCompletoAdministrador {
    // los nombres no deben ser vacios
    if (nombres == null || nombres == undefined)
      throw new NombresAdministradorVacio(
        'Los nombres del Administrador no pueden estar vacíos.',
      )

    const nombresAdministrador = new NombreCompletoAdministrador(nombres)

    // los nombres deben tener una longitud entre 4 y 32 caracteres
    if (nombres.primerNombre.length < 4 || nombres.primerNombre.length > 40)
      throw new LongitudInvalidaNombreAdministrador(
        'El primer nombre del Administrador debe tener entre 4 y 40 caracteres.',
      )

    if (nombres.segundoNombre != null && nombres.segundoNombre != undefined) {
      if (nombres.segundoNombre.length < 4 || nombres.segundoNombre.length > 40)
        throw new LongitudInvalidaNombreAdministrador(
          'El segundo nombre del Administrador debe tener entre 4 y 40 caracteres.',
        )
    }

    if (nombres.primerApellido.length < 4 || nombres.primerApellido.length > 40)
      throw new LongitudInvalidaNombreAdministrador(
        'El primer apellido del Administrador debe tener entre 4 y 40 caracteres.',
      )

    if (
      nombres.segundoApellido.length < 4 ||
      nombres.segundoApellido.length > 40
    )
      throw new LongitudInvalidaNombreAdministrador(
        'El segundo apellido del Administrador debe tener entre 4 y 40 caracteres.',
      )

    return nombresAdministrador
  }
}
