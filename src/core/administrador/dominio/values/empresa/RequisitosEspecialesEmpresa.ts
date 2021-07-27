import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import { LongitudInvalidaRequisitosEspecialesEmpresa } from '../../excepciones/empresa/RequsitosExpecialesEmpresa.excepciones'

export class RequisitosEspecialesEmpresa implements IValueObject {
  private constructor(private readonly requisitos: string) {}

  public obtenerRequisitos() {
    return this.requisitos
  }

  public esIgual(requisitosEspeciales: RequisitosEspecialesEmpresa): boolean {
    return this.requisitos == requisitosEspeciales.requisitos
  }

  public static crear(requisitos: string): RequisitosEspecialesEmpresa {
    if (requisitos) {
      if (requisitos.length < 4) {
        throw new LongitudInvalidaRequisitosEspecialesEmpresa(
          'Los requisitos especiales de la empresa deben contener como mínimo 4 caracteres.',
        )
      }
      if (requisitos.length > 256) {
        throw new LongitudInvalidaRequisitosEspecialesEmpresa(
          'Los requisitos especiales de la empresa deben contener como máximo 256 caracteres.',
        )
      }
    }

    return new RequisitosEspecialesEmpresa(requisitos)
  }
}
