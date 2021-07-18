import { Agregado } from '../../../comun/dominio/Agregado'
import { Direccion } from './Direccion'
import { EmpleadoNoEsMayorDeEdad } from './excepciones/empleado/Empleado.excecepciones'
import { CorreoElectronicoEmpleado } from './values/empleado/CorreoElectronicoEmpleado'
import { EstatusEmpleado } from './values/empleado/EstatusEmpleado'
import { FechaNacimientoEmpleado } from './values/empleado/FechaNacimientoEmpleado'
import { GeneroEmpleado } from './values/empleado/GeneroEmpleado'
import { IdentificadorEmpleado } from './values/empleado/IdentificadorEmpleado'
import { NivelEducativoEmpleado } from './values/empleado/NivelEducativoEmpleado'
import { NombreCompletoEmpleado } from './values/empleado/NombreCompletoEmpleado'
import { NumeroTelefonicoEmpleado } from './values/empleado/NumeroTelefonicoEmpleado'

export interface DatosEmpleado {
  identificador: IdentificadorEmpleado
  nombreCompleto: NombreCompletoEmpleado
  correoElectronico: CorreoElectronicoEmpleado
  numeroTelefonico: NumeroTelefonicoEmpleado
  nivelEducativo: NivelEducativoEmpleado
  estatus: EstatusEmpleado
  genero: GeneroEmpleado
  fechaNacimiento: FechaNacimientoEmpleado
  direccion: Direccion
}

export class Empleado extends Agregado {
  private constructor(
    private identificador: IdentificadorEmpleado,
    private nombreCompleto: NombreCompletoEmpleado,
    private correoElectronico: CorreoElectronicoEmpleado,
    private numeroTelefonico: NumeroTelefonicoEmpleado,
    private nivelEducativo: NivelEducativoEmpleado,
    private estatus: EstatusEmpleado,
    private genero: GeneroEmpleado,
    private fechaNacimiento: FechaNacimientoEmpleado,
    private direccion: Direccion,
  ) {
    super()
  }

  public obtenerIdentificador() {
    return this.identificador
  }

  public obtenerNombreCompleto() {
    return this.nombreCompleto
  }

  public obtenerCorreoElectronico() {
    return this.correoElectronico
  }

  public obtenerNumeroTelefonico() {
    return this.numeroTelefonico
  }

  public obtenerNivelEducativo() {
    return this.nivelEducativo
  }

  public obtenerEstatus() {
    return this.estatus
  }

  public obtenerGenero() {
    return this.genero
  }

  public obtenerFechaNacimiento() {
    return this.fechaNacimiento
  }

  public obtenerDireccion() {
    return this.direccion
  }

  public static crear(datos: DatosEmpleado): Empleado {
    const fechaActual = new Date().getFullYear()
    if (fechaActual - datos.fechaNacimiento.obtenerFecha().getFullYear() < 18)
      throw new EmpleadoNoEsMayorDeEdad('El empleado debe ser mayor de edad.')

    const empleado = new Empleado(
      datos.identificador,
      datos.nombreCompleto,
      datos.correoElectronico,
      datos.numeroTelefonico,
      datos.nivelEducativo,
      datos.estatus,
      datos.genero,
      datos.fechaNacimiento,
      datos.direccion,
    )

    empleado.agregarEvento({
      fecha: new Date(),
      nombre: 'EmpleadoCreado',
      id: datos.identificador.obtenerId(),
    })

    return empleado
  }
}
