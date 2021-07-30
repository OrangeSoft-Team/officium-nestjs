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
    return this.identificador.obtenerId()
  }

  public esIgual(experiencia: ExperienciaLaboral): boolean {
    return this.identificador.esIgual(experiencia.identificador)
  }

  public obtenerCargo() {
    return this.cargo.obtenerCargo()
  }

  public obtenerNombreEmpresa() {
    return this.nombreEmpresa.obtenerNombre()
  }

  public obtenerFechaInicio() {
    return this.rangoFecha.obtenerFechaInicio()
  }

  public obtenerFechaFin() {
    return this.rangoFecha.obtenerFechaFin()
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
