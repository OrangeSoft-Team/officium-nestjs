import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import {
  LongitudInvalidaPrimerApellidoEstudiante,
  LongitudInvalidaPrimerNombreEstudiante,
  LongitudInvalidaSegundoApellidoEstudiante,
  LongitudInvalidaSegundoNombreEstudiante,
  PrimerApellidoEstudianteVacio,
  PrimerNombreEstudianteVacio,
} from '../../excepciones/estudiante/NombreCompletoEstudiante.excepciones'

export class NombreCompletoEstudiante implements IValueObject {
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

  public esIgual(nombreCompleto: NombreCompletoEstudiante): boolean {
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
  ): NombreCompletoEstudiante {
    // primerNombre
    if (!primerNombre)
      throw new PrimerNombreEstudianteVacio(
        'El primer nombre del estudiante no puede estar vacío.',
      )

    if (primerNombre.length < 3)
      throw new LongitudInvalidaPrimerNombreEstudiante(
        'El primer nombre del estudiante debe contener como mínimo 3 caracteres.',
      )

    if (primerNombre.length > 40)
      throw new LongitudInvalidaPrimerNombreEstudiante(
        'El primer nombre del estudiante debe contener como máximo 40 caracteres.',
      )

    // primerApellido
    if (!primerApellido)
      throw new PrimerApellidoEstudianteVacio(
        'El primer apellido del estudiante no puede estar vacío.',
      )

    if (primerApellido.length < 3)
      throw new LongitudInvalidaPrimerApellidoEstudiante(
        'El primer apellido del estudiante debe contener como mínimo 3 caracteres.',
      )

    if (primerApellido.length > 40)
      throw new LongitudInvalidaPrimerApellidoEstudiante(
        'El primer apellido del estudiante debe contener como máximo 40 caracteres.',
      )

    // segundoNombre
    if (segundoNombre) {
      if (segundoNombre.length < 3)
        throw new LongitudInvalidaSegundoNombreEstudiante(
          'El segundo nombre del estudiante debe contener como mínimo 3 caracteres.',
        )
      if (segundoNombre.length > 40)
        throw new LongitudInvalidaSegundoNombreEstudiante(
          'El segundo nombre del estudiante debe contener como máximo 40 caracteres.',
        )
    }

    // segundoApellido
    if (segundoApellido) {
      if (segundoApellido.length < 3)
        throw new LongitudInvalidaSegundoApellidoEstudiante(
          'El segundo apellido del estudiante debe contener como mínimo 3 caracteres.',
        )
      if (segundoApellido.length > 40)
        throw new LongitudInvalidaSegundoApellidoEstudiante(
          'El segundo apellido del estudiante debe contener como máximo 40 caracteres.',
        )
    }

    // Si no hay errores
    return new NombreCompletoEstudiante(
      primerNombre,
      primerApellido,
      segundoNombre,
      segundoApellido,
    )
  }
}
