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
import { NivelEducativoEmpleado } from '../values/empleado/NivelEducativoEmpleado'
import { NombreCompletoEmpleado } from '../values/empleado/NombreCompletoEmpleado'
import { NumeroTelefonicoEmpleado } from '../values/empleado/NumeroTelefonicoEmpleado'
import { CargoExperienciaLaboral } from '../values/experienciaLaboral/CargoExperienciaLaboral'
import { IdentificadorExperienciaLaboral } from '../values/experienciaLaboral/IdentificadorExperienciaLaboral'
import { NombreEmpresaExperienciaLaboral } from '../values/experienciaLaboral/NombreEmpresaExperienciaLaboral'
import { RangoFechaExperienciaLaboral } from '../values/experienciaLaboral/RangoFechaExperienciaLaboral'

export interface DatosRestaurarEmpleado {
  id: string
  primerNombre: string
  primerApellido: string
  segundoNombre?: string
  segundoApellido?: string
  correoElectronico: string
  telefono: string
  nivelEducativo: string
  genero: string
  fechaNacimiento: Date
  estatus: string
  direccion: {
    id: string
    idCiudad: string
    calleUno: string
    calleDos?: string
    codigoPostal: string
  }
  experienciasLaborales?: {
    id: string
    cargo: string
    nombreEmpresa: string
    fechaInicio: Date
    fechaFin: Date
  }[]
}

export abstract class RestaurarEmpleado implements IServicioDominio {
  public static restaurar(datos: DatosRestaurarEmpleado): Empleado {
    const direccion = Direccion.restaurar({
      identificador: IdentificadorDireccion.crear(datos.direccion.id),
      calleUno: CalleUnoDireccion.crear(datos.direccion.calleUno),
      calleDos: CalleDosDireccion.crear(datos.direccion.calleDos),
      codigoPostal: CodigoPostalDireccion.crear(datos.direccion.codigoPostal),
      identificadorCiudad: IdentificadorCiudad.crear(datos.direccion.idCiudad),
    })

    const experienciasLaborales = datos.experienciasLaborales.map(
      (experiencia) =>
        ExperienciaLaboral.restaurar({
          identificador: IdentificadorExperienciaLaboral.crear(experiencia.id),
          cargo: CargoExperienciaLaboral.crear(experiencia.cargo),
          nombreEmpresa: NombreEmpresaExperienciaLaboral.crear(
            experiencia.nombreEmpresa,
          ),
          rangoFecha: RangoFechaExperienciaLaboral.crear(
            experiencia.fechaInicio,
            experiencia.fechaFin,
          ),
        }),
    )

    return Empleado.restaurar({
      identificador: IdentificadorEmpleado.crear(datos.id),
      correoElectronico: CorreoElectronicoEmpleado.crear(
        datos.correoElectronico,
      ),
      estatus: EstatusEmpleado.crear(datos.estatus as any),
      fechaNacimiento: FechaNacimientoEmpleado.crear(datos.fechaNacimiento),
      genero: GeneroEmpleado.crear(datos.genero as any),
      nivelEducativo: NivelEducativoEmpleado.crear(datos.nivelEducativo as any),
      numeroTelefonico: NumeroTelefonicoEmpleado.crear(datos.telefono),
      nombreCompleto: NombreCompletoEmpleado.crear(
        datos.primerNombre,
        datos.primerApellido,
        datos.segundoNombre,
        datos.segundoApellido,
      ),
      direccion,
      experienciasLaborales,
    })
  }
}
