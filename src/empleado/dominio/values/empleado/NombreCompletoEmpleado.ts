import { ValueObject } from 'src/comun/dominio/ValueObject'
import {
  LongitudInvalidaNombreEmpleado,
  NombresEmpleadoVacio,
} from '../../excepciones/empleado/NombreCompletoEmpleado.excepciones'

export interface Nombres {
  primerNombre: string
  segundoNombre?: string
  primerApellido: string
  segundoApellido: string
}

export class NombreCompletoEmpleado extends ValueObject {
  private constructor(private readonly nombres: Nombres) {
    super()
  }

  public esIgual(NombreCompletoEmpleado: NombreCompletoEmpleado): boolean {
    return (
      this.nombres.primerNombre ==
        NombreCompletoEmpleado.nombres.primerNombre &&
      this.nombres.segundoNombre ==
        NombreCompletoEmpleado.nombres.segundoNombre &&
      this.nombres.primerApellido ==
        NombreCompletoEmpleado.nombres.primerApellido &&
      this.nombres.segundoApellido ==
        NombreCompletoEmpleado.nombres.segundoApellido
    )
  }

  public static crear(nombres: Nombres): NombreCompletoEmpleado {
    // los nombres no deben ser vacios
    if (nombres == null || nombres == undefined)
      throw new NombresEmpleadoVacio(
        nombres,
        'Los nombres del empleado no pueden estar vacíos.',
      )

    const nombresEmpleado = new NombreCompletoEmpleado(nombres)

    // los nombres deben tener una longitud entre 4 y 32 caracteres
    if (nombres.primerNombre.length < 4 || nombres.primerNombre.length > 40)
      throw new LongitudInvalidaNombreEmpleado(
        nombresEmpleado,
        'El primer nombre del empleado debe tener entre 4 y 40 caracteres.',
      )

    if (nombres.segundoNombre != null && nombres.segundoNombre != undefined) {
      if (nombres.segundoNombre.length < 4 || nombres.segundoNombre.length > 40)
        throw new LongitudInvalidaNombreEmpleado(
          nombresEmpleado,
          'El segundo nombre del empleado debe tener entre 4 y 40 caracteres.',
        )
    }

    if (nombres.primerApellido.length < 4 || nombres.primerApellido.length > 40)
      throw new LongitudInvalidaNombreEmpleado(
        nombresEmpleado,
        'El primer apellido del empleado debe tener entre 4 y 40 caracteres.',
      )

    if (
      nombres.segundoApellido.length < 4 ||
      nombres.segundoApellido.length > 40
    )
      throw new LongitudInvalidaNombreEmpleado(
        nombresEmpleado,
        'El segundo apellido del empleado debe tener entre 4 y 40 caracteres.',
      )

    return nombresEmpleado
  }
}
