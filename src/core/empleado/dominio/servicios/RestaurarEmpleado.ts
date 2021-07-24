import { IServicioDominio } from '../../../../comun/dominio/IServicioDominio'
import { Direccion } from '../entidades/Direccion'
import { Empleado } from '../entidades/Empleado'
import { ExperienciaLaboral } from '../entidades/ExperienciaLaboral'
import { IdentificadorCiudad } from '../values/ciudad/IdentificadorCiudad'
import { CalleDosDireccion } from '../values/direccion/CalleDosDireccion'
import { CalleUnoDireccion } from '../values/direccion/CalleUnoDireccion'
import { CodigoPostalDireccion } from '../values/direccion/CodigoPostalDireccion'
import { IdentificadorDireccion } from '../values/direccion/IdentificadorDireccion'
import { CorreoElectronicoEmpleado } from '../values/empleado/CorreoElectronicoEmpleado'
import { EstatusEmpleado } from '../values/empleado/EstatusEmpleado'
import { FechaNacimientoEmpleado } from '../values/empleado/FechaNacimientoEmpleado'
import { GeneroEmpleado } from '../values/empleado/GeneroEmpleado'
import { IdentificadorEmpleado } from '../values/empleado/IdentificadorEmpleado'
import { IdentificadorHabilidad } from '../values/habilidad/IdentificadorHabilidad'
import { NivelEducativoEmpleado } from '../values/empleado/NivelEducativoEmpleado'
import { NombreCompletoEmpleado } from '../values/empleado/NombreCompletoEmpleado'
import { NumeroTelefonicoEmpleado } from '../values/empleado/NumeroTelefonicoEmpleado'
import { CargoExperienciaLaboral } from '../values/experienciaLaboral/CargoExperienciaLaboral'
import { IdentificadorExperienciaLaboral } from '../values/experienciaLaboral/IdentificadorExperienciaLaboral'
import { NombreEmpresaExperienciaLaboral } from '../values/experienciaLaboral/NombreEmpresaExperienciaLaboral'
import { RangoFechaExperienciaLaboral } from '../values/experienciaLaboral/RangoFechaExperienciaLaboral'

export interface DatosRestaurarDireccion {
  identificador: IdentificadorDireccion
  identificadorCiudad: IdentificadorCiudad
  calleUno: CalleUnoDireccion
  calleDos: CalleDosDireccion
  codigoPostal: CodigoPostalDireccion
}

export interface DatosRestaurarExperienciaLaboral {
  identificador: IdentificadorExperienciaLaboral
  cargo: CargoExperienciaLaboral
  nombreEmpresa: NombreEmpresaExperienciaLaboral
  rangoFecha: RangoFechaExperienciaLaboral
}

export interface DatosRestaurarEmpleado {
  identificador: IdentificadorEmpleado
  nombreCompleto: NombreCompletoEmpleado
  correoElectronico: CorreoElectronicoEmpleado
  numeroTelefonico: NumeroTelefonicoEmpleado
  nivelEducativo: NivelEducativoEmpleado
  genero: GeneroEmpleado
  fechaNacimiento: FechaNacimientoEmpleado
  estatus: EstatusEmpleado
  direccion: DatosRestaurarDireccion
  experienciasLaborales: DatosRestaurarExperienciaLaboral[]
  identificadoresHabilidades?: IdentificadorHabilidad[]
}

export abstract class RestaurarEmpleado implements IServicioDominio {
  public static restaurar(datos: DatosRestaurarEmpleado): Empleado {
    const direccion = Direccion.restaurar({
      ...datos.direccion,
    })

    const experienciasLaborales = datos.experienciasLaborales.map(
      (experiencia) => ExperienciaLaboral.restaurar({ ...experiencia }),
    )

    return Empleado.restaurar({
      ...datos,
      direccion,
      experienciasLaborales,
    })
  }
}
