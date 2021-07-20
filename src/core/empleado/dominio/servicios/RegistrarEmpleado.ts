import { IServicioDominio } from '../../../../comun/dominio/IServicioDominio'
import { Direccion } from '../entidades/Direccion'
import { Empleado } from '../entidades/Empleado'
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

export interface DatosRegistroEmpleado {
  idEmpleado: string
  primerNombre: string
  primerApellido: string
  segundoNombre?: string
  segundoApellido?: string
  correoElectronico: string
  telefono: string
  nivelEducativo: string
  genero: string
  fechaNacimiento: Date
  idDireccion: string
  calleUno: string
  calleDos?: string
  codigoPostal: string
  idCiudad: string
  idEstado: string
  idPais: string
}

export abstract class RegistrarEmpleado implements IServicioDominio {
  public static ejecutar(datos: DatosRegistroEmpleado): Empleado {
    const direccion = Direccion.crear({
      identificador: IdentificadorDireccion.crear(datos.idDireccion),
      calleUno: CalleUnoDireccion.crear(datos.calleUno),
      calleDos: CalleDosDireccion.crear(datos.calleDos),
      codigoPostal: CodigoPostalDireccion.crear(datos.codigoPostal),
      identificadorCiudad: IdentificadorCiudad.crear(datos.idCiudad),
    })

    const empleado = Empleado.crear({
      identificador: IdentificadorEmpleado.crear(datos.idEmpleado),
      correoElectronico: CorreoElectronicoEmpleado.crear(
        datos.correoElectronico,
      ),
      fechaNacimiento: FechaNacimientoEmpleado.crear(datos.fechaNacimiento),
      genero: GeneroEmpleado.crear(datos.genero as any),
      nivelEducativo: NivelEducativoEmpleado.crear(datos.nivelEducativo as any),
      nombreCompleto: NombreCompletoEmpleado.crear(
        datos.primerNombre,
        datos.primerApellido,
        datos.segundoNombre,
        datos.segundoApellido,
      ),
      numeroTelefonico: NumeroTelefonicoEmpleado.crear(datos.telefono),
      estatus: EstatusEmpleado.crear('DISPONIBLE'),
      direccion,
    })

    return empleado
  }
}
