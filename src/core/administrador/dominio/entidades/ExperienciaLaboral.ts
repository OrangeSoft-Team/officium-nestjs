import { Entidad } from '../../../../comun/dominio/Entidad'
import { CargoExperienciaLaboral } from '../values/experienciaLaboral/CargoExperienciaLaboral'
import { IdentificadorExperienciaLaboral } from '../values/experienciaLaboral/IdentificadorExperienciaLaboral'
import { NombreEmpresaExperienciaLaboral } from '../values/experienciaLaboral/NombreEmpresaExperienciaLaboral'
import { RangoFechaExperienciaLaboral } from '../values/experienciaLaboral/RangoFechaExperienciaLaboral'

export interface DatosExperienciaLaboral {
  identificador: IdentificadorExperienciaLaboral
  cargo: CargoExperienciaLaboral
  nombreEmpresa: NombreEmpresaExperienciaLaboral
  rangoFecha: RangoFechaExperienciaLaboral
}

export class ExperienciaLaboral extends Entidad {
  private constructor(
    private readonly identificador: IdentificadorExperienciaLaboral,
    private cargo: CargoExperienciaLaboral,
    private nombreEmpresa: NombreEmpresaExperienciaLaboral,
    private rangoFecha: RangoFechaExperienciaLaboral,
  ) {
    super()
  }

  public obtenerIdentificador() {
    return this.identificador
  }

  public esIgual(experiencia: ExperienciaLaboral): boolean {
    return this.identificador.esIgual(experiencia.identificador)
  }

  public obtenerCargo() {
    return this.cargo
  }

  public obtenerNombreEmpresa() {
    return this.nombreEmpresa
  }

  public obtenerRangoFecha() {
    return this.rangoFecha
  }

  public static restaurar(datos: DatosExperienciaLaboral): ExperienciaLaboral {
    return new ExperienciaLaboral(
      datos.identificador,
      datos.cargo,
      datos.nombreEmpresa,
      datos.rangoFecha,
    )
  }
}
