import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import {
  EstatusEmpresaVacio,
  EstatusEmpresaInvalido,
} from '../../excepciones/empresa/EstatusEmpresa.excepciones'

type ESTADOS = 'ACTIVO' | 'SUSPENDIDO'

export class EstatusEmpresa implements IValueObject {
  private constructor(private readonly estatus: ESTADOS) {}

  public obtenerEstatus() {
    return this.estatus
  }

  public esIgual(estatusEmpresa: EstatusEmpresa): boolean {
    return this.estatus == estatusEmpresa.estatus
  }

  public static crear(estatus: ESTADOS): EstatusEmpresa {
    if (!estatus)
      throw new EstatusEmpresaVacio(
        'El estatus de la empresa no debe estar vacío.',
      )

    if (!['ACTIVO', 'SUSPENDIDO'].includes(estatus))
      throw new EstatusEmpresaInvalido(
        'El estatus de la empresa debe ser "ACTIVO" o "SUSPENDIDO".',
      )
    // Si no hay errores
    return new EstatusEmpresa(estatus)
  }
}
