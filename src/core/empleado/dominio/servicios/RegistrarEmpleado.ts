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

export interface DatosRegistroDireccion {
  identificador: IdentificadorDireccion
  calleUno: CalleUnoDireccion
  calleDos: CalleDosDireccion
  codigoPostal: CodigoPostalDireccion
  identificadorCiudad: IdentificadorCiudad
}

export interface DatosRegistroEmpleado {
  identificador: IdentificadorEmpleado
  nombreCompleto: NombreCompletoEmpleado
  correoElectronico: CorreoElectronicoEmpleado
  numeroTelefonico: NumeroTelefonicoEmpleado
  nivelEducativo: NivelEducativoEmpleado
  genero: GeneroEmpleado
  fechaNacimiento: FechaNacimientoEmpleado
  direccion: DatosRegistroDireccion
}

export abstract class RegistrarEmpleado implements IServicioDominio {
  public static registrar(datos: DatosRegistroEmpleado): Empleado {
    const direccion = Direccion.crear({
      ...datos.direccion,
    })

    const empleado = Empleado.crear({
      ...datos,
      estatus: EstatusEmpleado.crear('DISPONIBLE'),
      direccion,
      experienciasLaborales: [],
    })

    return empleado
  }
}
