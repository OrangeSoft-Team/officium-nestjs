import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import {
  NumeroTelefonicoEmpleadoVacio,
  LongitudInvalidaNumeroTelefonicoEmpleado,
  FormatoIncorrectoNumeroTelefonicoEmpleado,
} from '../../excepciones/empleado/NumeroTelefonicoEmpleado.excepciones'

export class NumeroTelefonicoEmpleado implements IValueObject {
  private constructor(private readonly numero: string) {}

  public obtenerNumero() {
    return this.numero
  }

  public esIgual(numeroTelefonico: NumeroTelefonicoEmpleado): boolean {
    return this.numero == numeroTelefonico.numero
  }

  public static crear(numero: string): NumeroTelefonicoEmpleado {
    if (!numero)
      throw new NumeroTelefonicoEmpleadoVacio(
        'El número telefónico del empleado no puede estar vacío.',
      )

    if (numero.length < 12)
      throw new LongitudInvalidaNumeroTelefonicoEmpleado(
        'El número telefónico del empleado debe contener como mínimo 12 caracteres.',
      )

    if (numero.length > 16)
      throw new LongitudInvalidaNumeroTelefonicoEmpleado(
        'El número telefónico del empleado debe contener como máximo 16 caracteres.',
      )

    if (!/^[+]{0,1}[0-9]*$/.test(numero))
      throw new FormatoIncorrectoNumeroTelefonicoEmpleado(
        'El formato del número telefónico del empleado debe contener solamente números y opcionalmente un simbolo "+" al inicio.',
      )

    // si no hay errores
    return new NumeroTelefonicoEmpleado(numero)
  }
}
