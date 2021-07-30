import { IServicioDominio } from '../../../../comun/dominio/IServicioDominio'
import { Empleado } from '../entidades/Empleado'
import { ExperienciaLaboral } from '../entidades/ExperienciaLaboral'
import { Habilidad } from '../entidades/Habilidad'
import { CorreoElectronicoEmpleado } from '../values/empleado/CorreoElectronicoEmpleado'
import { EstatusEmpleado } from '../values/empleado/EstatusEmpleado'
import { FechaNacimientoEmpleado } from '../values/empleado/FechaNacimientoEmpleado'
import { GeneroEmpleado } from '../values/empleado/GeneroEmpleado'
import { IdentificadorEmpleado } from '../values/empleado/IdentificadorEmpleado'
import { NombreCompletoEmpleado } from '../values/empleado/NombreCompletoEmpleado'
import { CargoExperienciaLaboral } from '../values/experienciaLaboral/CargoExperienciaLaboral'
import { IdentificadorExperienciaLaboral } from '../values/experienciaLaboral/IdentificadorExperienciaLaboral'
import { NombreEmpresaExperienciaLaboral } from '../values/experienciaLaboral/NombreEmpresaExperienciaLaboral'
import { RangoFechaExperienciaLaboral } from '../values/experienciaLaboral/RangoFechaExperienciaLaboral'
import { CategoriaHabilidad } from '../values/habilidad/CategoriaHabilidad'
import { IdentificadorHabilidad } from '../values/habilidad/IdentificadorHabilidad'
import { NombreHabilidad } from '../values/habilidad/NombreHabilidad'

export interface DatosRestaurarExperienciaLaboral {
  identificador: IdentificadorExperienciaLaboral
  nombreEmpresa: NombreEmpresaExperienciaLaboral
  cargo: CargoExperienciaLaboral
  rangoFecha: RangoFechaExperienciaLaboral
}

export interface DatosRestaurarHabilidad {
  identificador: IdentificadorHabilidad
  nombre: NombreHabilidad
  categoria: CategoriaHabilidad
}

export interface DatosRestaurarEmpleado {
  identificador: IdentificadorEmpleado
  nombreCompleto: NombreCompletoEmpleado
  correoElectronico: CorreoElectronicoEmpleado
  estatus: EstatusEmpleado
  genero: GeneroEmpleado
  fechaNacimiento: FechaNacimientoEmpleado
  habilidades?: DatosRestaurarHabilidad[]
  experienciasLaborales?: DatosRestaurarExperienciaLaboral[]
}

export abstract class RestaurarEmpleado implements IServicioDominio {
  public static restaurar(datos: DatosRestaurarEmpleado): Empleado {
    const habilidades = datos.habilidades?.map((habilidad) =>
      Habilidad.restaurar({ ...habilidad }),
    )

    const experienciasLaborales = datos.experienciasLaborales?.map(
      (experiencia) => ExperienciaLaboral.restaurar({ ...experiencia }),
    )

    return Empleado.restaurar({ ...datos, habilidades, experienciasLaborales })
  }
}
