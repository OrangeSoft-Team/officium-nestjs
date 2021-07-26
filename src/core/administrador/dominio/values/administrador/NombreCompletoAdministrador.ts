import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import {
  PrimerNombreAdministradorVacio,
  LongitudInvalidaPrimerNombreAdministrador,
  PrimerApellidoAdministradorVacio,
  LongitudInvalidaPrimerApellidoAdministrador,
} from '../../excepciones/administrador/NombreCompletoAdministrador.excepciones'

export class NombreCompletoAdministrador implements IValueObject {
  private constructor(
    private readonly primerNombre: string,
    private readonly primerApellido: string,
  ) {}

  public obtenerPrimerNombre() {
    return this.primerNombre
  }

  public obtenerPrimerApellido() {
    return this.primerApellido
  }

  public esIgual(nombreCompleto: NombreCompletoAdministrador): boolean {
    return (
      this.primerNombre == nombreCompleto.primerNombre &&
      this.primerApellido == nombreCompleto.primerApellido
    )
  }

  public static crear(
    primerNombre: string,
    primerApellido: string,
  ): NombreCompletoAdministrador {
    // primerNombre
    if (!primerNombre)
      throw new PrimerNombreAdministradorVacio(
        'El primer nombre del administrador no puede estar vacío.',
      )

    if (primerNombre.length < 3)
      throw new LongitudInvalidaPrimerNombreAdministrador(
        'El primer nombre del administrador debe contener como mínimo 3 caracteres.',
      )

    if (primerNombre.length > 40)
      throw new LongitudInvalidaPrimerNombreAdministrador(
        'El primer nombre del administrador debe contener como máximo 40 caracteres.',
      )

    // primerApellido
    if (!primerApellido)
      throw new PrimerApellidoAdministradorVacio(
        'El primer apellido del administrador no puede estar vacío.',
      )

    if (primerApellido.length < 3)
      throw new LongitudInvalidaPrimerApellidoAdministrador(
        'El primer apellido del administrador debe contener como mínimo 3 caracteres.',
      )

    if (primerApellido.length > 40)
      throw new LongitudInvalidaPrimerApellidoAdministrador(
        'El primer apellido del administrador debe contener como máximo 40 caracteres.',
      )

    // Si no hay errores
    return new NombreCompletoAdministrador(primerNombre, primerApellido)
  }
}
