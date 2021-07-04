import { ValueObject } from '../../../../comun/dominio/ValueObject'
import {
  EstadoEmpresaVacio,
  EstadoEmpresaInvalido,
} from '../../excepciones/empresa/EstadoEmpresa.excepciones'

type ESTADOS = 'activo' | 'inactivo'

export class EstadoEmpresa extends ValueObject {
  private constructor(private readonly estado: ESTADOS) {
    super()
  }

  public esIgual(estadoEmpresa: EstadoEmpresa): boolean {
    return this.estado == estadoEmpresa.estado
  }

  public static crear(estado: ESTADOS): EstadoEmpresa {
    if (estado == null || estado == undefined)
      throw new EstadoEmpresaVacio(
        'El estado de la empresa no puede estar vacío.',
      )

    const estadoEmpresa = new EstadoEmpresa(estado)

    if (!['activo', 'inactivo'].includes(estado))
      throw new EstadoEmpresaInvalido(
        'El estado de la empresa debe ser "activo" o "inactivo"',
      )

    return estadoEmpresa
  }
}
