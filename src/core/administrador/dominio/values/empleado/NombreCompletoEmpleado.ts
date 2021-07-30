import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import {
  PrimerNombreEmpleadoVacio,
  LongitudInvalidaPrimerNombreEmpleado,
  PrimerApellidoEmpleadoVacio,
  LongitudInvalidaPrimerApellidoEmpleado,
  LongitudInvalidaSegundoNombreEmpleado,
  LongitudInvalidaSegundoApellidoEmpleado,
} from '../../excepciones/empleado/NombreCompletoEmpleado.excepciones'

export class NombreCompletoEmpleado implements IValueObject {
  private constructor(
    private readonly primerNombre: string,
    private readonly primerApellido: string,
    private readonly segundoNombre?: string,
    private readonly segundoApellido?: string,
  ) {}

  public obtenerPrimerNombre() {
    return this.primerNombre
  }

  public obtenerPrimerApellido() {
    return this.primerApellido
  }

  public obtenerSegundoNombre() {
    return this.segundoNombre
  }

  public obtenerSegundoApellido() {
    return this.segundoApellido
  }

  public esIgual(nombreCompleto: NombreCompletoEmpleado): boolean {
    return (
      this.primerNombre == nombreCompleto.primerNombre &&
      this.primerApellido == nombreCompleto.primerApellido &&
      this.segundoNombre == nombreCompleto.segundoNombre &&
      this.segundoApellido == nombreCompleto.segundoApellido
    )
  }

  public static crear(
    primerNombre: string,
    primerApellido: string,
    segundoNombre?: string,
    segundoApellido?: string,
  ): NombreCompletoEmpleado {
    // primerNombre
    if (!primerNombre)
      throw new PrimerNombreEmpleadoVacio(
        'El primer nombre del empleado no puede estar vacío.',
      )

    if (primerNombre.length < 3)
      throw new LongitudInvalidaPrimerNombreEmpleado(
        'El primer nombre del empleado debe contener como mínimo 3 caracteres.',
      )

    if (primerNombre.length > 40)
      throw new LongitudInvalidaPrimerNombreEmpleado(
        'El primer nombre del empleado debe contener como máximo 40 caracteres.',
      )

    // primerApellido
    if (!primerApellido)
      throw new PrimerApellidoEmpleadoVacio(
        'El primer apellido del empleado no puede estar vacío.',
      )

    if (primerApellido.length < 3)
      throw new LongitudInvalidaPrimerApellidoEmpleado(
        'El primer apellido del empleado debe contener como mínimo 3 caracteres.',
      )

    if (primerApellido.length > 40)
      throw new LongitudInvalidaPrimerApellidoEmpleado(
        'El primer apellido del empleado debe contener como máximo 40 caracteres.',
      )

    // segundoNombre
    if (segundoNombre) {
      if (segundoNombre.length < 3)
        throw new LongitudInvalidaSegundoNombreEmpleado(
          'El segundo nombre del empleado debe contener como mínimo 3 caracteres.',
        )
      if (segundoNombre.length > 40)
        throw new LongitudInvalidaSegundoNombreEmpleado(
          'El segundo nombre del empleado debe contener como máximo 40 caracteres.',
        )
    }

    // segundoApellido
    if (segundoApellido) {
      if (segundoApellido.length < 3)
        throw new LongitudInvalidaSegundoApellidoEmpleado(
          'El segundo apellido del empleado debe contener como mínimo 3 caracteres.',
        )
      if (segundoApellido.length > 40)
        throw new LongitudInvalidaSegundoApellidoEmpleado(
          'El segundo apellido del empleado debe contener como máximo 40 caracteres.',
        )
    }

    // Si no hay errores
    return new NombreCompletoEmpleado(
      primerNombre,
      primerApellido,
      segundoNombre,
      segundoApellido,
    )
  }
}
