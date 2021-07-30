import { IServicioDominio } from '../../../../comun/dominio/IServicioDominio'
import { Ciudad } from '../entidades/Ciudad'
import { Direccion } from '../entidades/Direccion'
import { Empleado } from '../entidades/Empleado'
import { Estado } from '../entidades/Estado'
import { ExperienciaLaboral } from '../entidades/ExperienciaLaboral'
import { Habilidad } from '../entidades/Habilidad'
import { Pais } from '../entidades/Pais'
import { IdentificadorCiudad } from '../values/ciudad/IdentificadorCiudad'
import { NombreCiudad } from '../values/ciudad/NombreCiudad'
import { CalleDosDireccion } from '../values/direccion/CalleDosDireccion'
import { CalleUnoDireccion } from '../values/direccion/CalleUnoDireccion'
import { CodigoPostalDireccion } from '../values/direccion/CodigoPostalDireccion'
import { IdentificadorDireccion } from '../values/direccion/IdentificadorDireccion'
import { CorreoElectronicoEmpleado } from '../values/empleado/CorreoElectronicoEmpleado'
import { EstatusEmpleado } from '../values/empleado/EstatusEmpleado'
import { FechaNacimientoEmpleado } from '../values/empleado/FechaNacimientoEmpleado'
import { GeneroEmpleado } from '../values/empleado/GeneroEmpleado'
import { IdentificadorEmpleado } from '../values/empleado/IdentificadorEmpleado'
import { NombreCompletoEmpleado } from '../values/empleado/NombreCompletoEmpleado'
import { IdentificadorEstado } from '../values/estado/IdentificadorEstado'
import { NombreEstado } from '../values/estado/NombreEstado'
import { CargoExperienciaLaboral } from '../values/experienciaLaboral/CargoExperienciaLaboral'
import { IdentificadorExperienciaLaboral } from '../values/experienciaLaboral/IdentificadorExperienciaLaboral'
import { NombreEmpresaExperienciaLaboral } from '../values/experienciaLaboral/NombreEmpresaExperienciaLaboral'
import { RangoFechaExperienciaLaboral } from '../values/experienciaLaboral/RangoFechaExperienciaLaboral'
import { CategoriaHabilidad } from '../values/habilidad/CategoriaHabilidad'
import { IdentificadorHabilidad } from '../values/habilidad/IdentificadorHabilidad'
import { NombreHabilidad } from '../values/habilidad/NombreHabilidad'
import { IdentificadorPais } from '../values/pais/IdentificadorPais'
import { NombrePais } from '../values/pais/NombrePais'

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

export interface DatosRestaurarDireccion {
  identificador: IdentificadorDireccion
  calleUno: CalleUnoDireccion
  calleDos: CalleDosDireccion
  codigoPostal: CodigoPostalDireccion
  identificadorPais: IdentificadorPais
  nombrePais: NombrePais
  identificadorEstado: IdentificadorEstado
  nombreEstado: NombreEstado
  identificadorCiudad: IdentificadorCiudad
  nombreCiudad: NombreCiudad
}

export interface DatosRestaurarEmpleado {
  identificador: IdentificadorEmpleado
  nombreCompleto: NombreCompletoEmpleado
  correoElectronico: CorreoElectronicoEmpleado
  estatus: EstatusEmpleado
  genero: GeneroEmpleado
  fechaNacimiento: FechaNacimientoEmpleado
  direccion?: DatosRestaurarDireccion
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

    const direccion = Direccion.restaurar({
      identificador: datos.direccion?.identificador,
      calleUno: datos.direccion?.calleUno,
      calleDos: datos.direccion?.calleDos,
      codigoPostal: datos.direccion?.codigoPostal,
      ciudad: Ciudad.restaurar({
        identificador: datos.direccion?.identificadorCiudad,
        nombre: datos.direccion?.nombreCiudad,
      }),
      estado: Estado.restaurar({
        identificador: datos.direccion?.identificadorEstado,
        nombre: datos.direccion?.nombreEstado,
      }),
      pais: Pais.restaurar({
        identificador: datos.direccion?.identificadorPais,
        nombre: datos.direccion?.nombrePais,
      }),
    })

    return Empleado.restaurar({
      ...datos,
      habilidades,
      direccion,
      experienciasLaborales,
    })
  }
}
