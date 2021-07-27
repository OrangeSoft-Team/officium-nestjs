import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import {
  CorreoElectronicoEmpresaVacio,
  LongitudInvalidaCorreoElectronicoEmpresa,
  FormatoIncorrectoCorreoElectronicoEmpresa,
} from '../../excepciones/empresa/CorreoElectronicoEmpresa.excepciones'

export class CorreoElectronicoEmpresa implements IValueObject {
  private constructor(private readonly correo: string) {}

  public obtenerCorreo() {
    return this.correo
  }

  public esIgual(correoElectronico: CorreoElectronicoEmpresa): boolean {
    return this.correo == correoElectronico.correo
  }

  public static crear(correo: string): CorreoElectronicoEmpresa {
    if (!correo)
      throw new CorreoElectronicoEmpresaVacio(
        'El correo electrónico de la empresa no puede estar vacío.',
      )

    if (correo.length < 3)
      throw new LongitudInvalidaCorreoElectronicoEmpresa(
        'El correo electrónico de la empresa debe contener como mínimo 4 caracteres.',
      )

    if (correo.length > 320)
      throw new LongitudInvalidaCorreoElectronicoEmpresa(
        'El correo electrónico de la empresa debe contener como máximo 320 caracteres.',
      )

    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        correo,
      )
    )
      throw new FormatoIncorrectoCorreoElectronicoEmpresa(
        'El correo electrónico de la empresa debe tener un formato valido, del tipo nombre@dominio.',
      )

    // si no hay errores
    return new CorreoElectronicoEmpresa(correo)
  }
}
