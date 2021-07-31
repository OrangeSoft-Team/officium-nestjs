import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import { IdentificadorCertificadoVacio } from '../../excepciones/certificado/IdentificadorCertificado.excepciones'

export class IdentificadorCertificado implements IValueObject {
  private constructor(private readonly id: string) {}

  public obtenerId() {
    return this.id
  }

  public esIgual(identificador: IdentificadorCertificado): boolean {
    return this.id == identificador.obtenerId()
  }

  public static crear(id: string): IdentificadorCertificado {
    // No debe ser vacio
    if (id == null || id == undefined || id == '')
      throw new IdentificadorCertificadoVacio(
        'El identificador de la Certificado no puede estar vacio.',
      )
    // Si no hay errores
    return new IdentificadorCertificado(id)
  }
}
