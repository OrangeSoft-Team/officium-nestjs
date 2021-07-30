import { Agregado } from '../../../../comun/dominio/Agregado'
import { EstatusEstudiante } from '../values/estudiante/EstatusEstudiante'
import { IdentificadorEstudiante } from '../values/estudiante/IdentificadorEstudiante'
import { NombreCompletoEstudiante } from '../values/estudiante/NombreCompletoEstudiante'
import { CorreoElectronicoEstudiante } from '../values/estudiante/CorreoElectronicoEstudiante'
import { NumeroTelefonicoEstudiante } from '../values/estudiante/NumeroTelefonicoEstudiante'

export interface DatosEmpleado {
  identificador: IdentificadorEstudiante
  nombreCompleto: NombreCompletoEstudiante
  correoElectronico: CorreoElectronicoEstudiante
  numeroTelefonico: NumeroTelefonicoEstudiante
  estatus: EstatusEstudiante
}

export class Estudiante extends Agregado {
  private constructor(
    private readonly identificador: IdentificadorEstudiante,
    private nombreCompleto: NombreCompletoEstudiante,
    private correoElectronico: CorreoElectronicoEstudiante,
    private numeroTelefonico: NumeroTelefonicoEstudiante,
    private estatus: EstatusEstudiante,
  ) {
    super()
  }

  public esIgual(estudiante: Estudiante): boolean {
    return this.identificador.esIgual(estudiante.obtenerIdentificador())
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

  public obtenerEstatus() {
    return this.estatus
  }

  public static crear(datos: DatosEmpleado): Estudiante {

    const estudiante = new Estudiante(
      datos.identificador,
      datos.nombreCompleto,
      datos.correoElectronico,
      datos.numeroTelefonico,
      datos.estatus,
    )
    return estudiante
  }

  public static restaurar(datos: DatosEmpleado): Estudiante {
    return new Estudiante(
      datos.identificador,
      datos.nombreCompleto,
      datos.correoElectronico,
      datos.numeroTelefonico,
      datos.estatus,
    )
  }
}
