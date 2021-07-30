import { Agregado } from '../../../../comun/dominio/Agregado'
import { CorreoElectronicoEmpleado } from '../values/empleado/CorreoElectronicoEmpleado'
import { EstatusEmpleado } from '../values/empleado/EstatusEmpleado'
import { FechaNacimientoEmpleado } from '../values/empleado/FechaNacimientoEmpleado'
import { GeneroEmpleado } from '../values/empleado/GeneroEmpleado'
import { IdentificadorEmpleado } from '../values/empleado/IdentificadorEmpleado'
import { NombreCompletoEmpleado } from '../values/empleado/NombreCompletoEmpleado'
import { Direccion } from './Direccion'
import { ExperienciaLaboral } from './ExperienciaLaboral'
import { Habilidad } from './Habilidad'

export interface DatosEmpleado {
  identificador: IdentificadorEmpleado
  nombreCompleto: NombreCompletoEmpleado
  genero: GeneroEmpleado
  estatus: EstatusEmpleado
  correoElectronico: CorreoElectronicoEmpleado
  fechaNacimiento: FechaNacimientoEmpleado
  direccion?: Direccion
  habilidades?: Habilidad[]
  experienciasLaborales?: ExperienciaLaboral[]
}

export class Empleado extends Agregado {
  public constructor(
    private readonly identificador: IdentificadorEmpleado,
    private nombreCompleto: NombreCompletoEmpleado,
    private genero: GeneroEmpleado,
    private estatus: EstatusEmpleado,
    private correoElectronico: CorreoElectronicoEmpleado,
    private fechaNacimiento: FechaNacimientoEmpleado,
    private direccion?: Direccion,
    private habilidades?: Habilidad[],
    private experienciasLaborales?: ExperienciaLaboral[],
  ) {
    super()
  }

  public esIgual(empleado: Empleado): boolean {
    return this.identificador.esIgual(empleado.identificador)
  }

  public obtenerIdentificador() {
    return this.identificador.obtenerId()
  }

  public obtenerPrimerNombre() {
    return this.nombreCompleto.obtenerPrimerNombre()
  }

  public obtenerPrimerApellido() {
    return this.nombreCompleto.obtenerPrimerApellido()
  }

  public obtenerSegundoNombre() {
    return this.nombreCompleto.obtenerSegundoNombre()
  }

  public obtenerSegundoApellido() {
    return this.nombreCompleto.obtenerSegundoApellido()
  }

  public obtenerCorreoElectronico() {
    return this.correoElectronico.obtenerCorreo()
  }

  public obtenerEstatus() {
    return this.estatus.obtenerEstatus()
  }

  public obtenerGenero() {
    return this.genero.obtenerGenero()
  }

  public obtenerFechaNacimiento() {
    return this.fechaNacimiento.obtenerFecha()
  }

  public obtenerHabilidades() {
    return this.habilidades
  }

  public obtenerExperienciasLaborales() {
    return this.experienciasLaborales
  }

  public obtenerDireccion() {
    return this.direccion
  }

  public static restaurar(datos: DatosEmpleado): Empleado {
    return new Empleado(
      datos.identificador,
      datos.nombreCompleto,
      datos.genero,
      datos.estatus,
      datos.correoElectronico,
      datos.fechaNacimiento,
      datos.direccion,
      datos.habilidades,
      datos.experienciasLaborales,
    )
  }
}
