import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import {
  NumeroTelefonicoEstudianteVacio,
  LongitudInvalidaNumeroTelefonicoEstudiante,
  FormatoIncorrectoNumeroTelefonicoEstudiante,
} from '../../excepciones/estudiante/NumeroTelefonicoEstudiante.excepciones'

export class NumeroTelefonicoEstudiante implements IValueObject {
  private constructor(private readonly numero: string) {}

  public obtenerNumero() {
    return this.numero
  }

  public esIgual(numeroTelefonico: NumeroTelefonicoEstudiante): boolean {
    return this.numero == numeroTelefonico.numero
  }

  public static crear(numero: string): NumeroTelefonicoEstudiante {
    if (!numero)
      throw new NumeroTelefonicoEstudianteVacio(
        'El número telefónico del estudiante no puede estar vacío.',
      )

    if (numero.length < 12)
      throw new LongitudInvalidaNumeroTelefonicoEstudiante(
        'El número telefónico del estudiante debe contener como mínimo 12 caracteres.',
      )

    if (numero.length > 16)
      throw new LongitudInvalidaNumeroTelefonicoEstudiante(
        'El número telefónico del estudiante debe contener como máximo 16 caracteres.',
      )

    if (!/^[+]{0,1}[0-9]*$/.test(numero))
      throw new FormatoIncorrectoNumeroTelefonicoEstudiante(
        'El formato del número telefónico del estudiante debe contener solamente números y opcionalmente un simbolo "+" al inicio.',
      )

    // si no hay errores
    return new NumeroTelefonicoEstudiante(numero)
  }
}
