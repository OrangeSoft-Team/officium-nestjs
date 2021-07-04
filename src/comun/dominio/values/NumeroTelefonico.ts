import {
  NumeroTelefonicoVacio,
  LongitudInvalidaNumeroTelefonico,
  FormatoInvalidoNumeroTelefonico,
} from '../excepciones/NumeroTelefonico.excepciones'
import { ValueObject } from '../ValueObject'

export class NumeroTelefonico extends ValueObject {
  private constructor(private readonly numero: string) {
    super()
  }

  public esIgual(numeroTelefonico: NumeroTelefonico): boolean {
    return this.numero == numeroTelefonico.numero
  }

  public static crear(numero: string): NumeroTelefonico {
    // No debe ser vacio
    if (numero == null || numero == undefined || numero == '')
      throw new NumeroTelefonicoVacio(
        'El número telefónico no puede estar vacío.',
      )

    const numeroTelefonico = new NumeroTelefonico(numero)

    if (numero.length < 12)
      throw new LongitudInvalidaNumeroTelefonico(
        'El número telefónico debe contener como mínimo 12 caracteres.',
      )

    if (numero.length > 16)
      throw new LongitudInvalidaNumeroTelefonico(
        'El número telefónico debe contener como máximo 16 caracteres.',
      )

    // Debe tener un formato valido
    if (!/^[+]{0,1}[0-9]*$/.test(numero))
      throw new FormatoInvalidoNumeroTelefonico(
        'El formato del número telefónico debe contener solamente números y opcionalmente un simbolo "+" al inicio.',
      )

    return numeroTelefonico
  }
}
