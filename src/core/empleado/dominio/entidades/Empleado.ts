import { Agregado } from '../../../../comun/dominio/Agregado'
import { Direccion } from './Direccion'
import { EmpleadoNoEsMayorDeEdad } from '../excepciones/empleado/Empleado.excepciones'
import { CorreoElectronicoEmpleado } from '../values/empleado/CorreoElectronicoEmpleado'
import { EstatusEmpleado } from '../values/empleado/EstatusEmpleado'
import { FechaNacimientoEmpleado } from '../values/empleado/FechaNacimientoEmpleado'
import { GeneroEmpleado } from '../values/empleado/GeneroEmpleado'
import { IdentificadorEmpleado } from '../values/empleado/IdentificadorEmpleado'
import { NivelEducativoEmpleado } from '../values/empleado/NivelEducativoEmpleado'
import { NombreCompletoEmpleado } from '../values/empleado/NombreCompletoEmpleado'
import { NumeroTelefonicoEmpleado } from '../values/empleado/NumeroTelefonicoEmpleado'
import { ExperienciaLaboral } from './ExperienciaLaboral'
import { ExperienciaLaboralNoExiste } from '../excepciones/experienciaLaboral/ExperienciaLaboral.excepciones'
import { IdentificadorExperienciaLaboral } from '../values/experienciaLaboral/IdentificadorExperienciaLaboral'
import { IdentificadorHabilidad } from '../values/habilidad/IdentificadorHabilidad'

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
  experienciasLaborales?: ExperienciaLaboral[]
  identificadoresHabilidades?: IdentificadorHabilidad[]
}

export class Empleado extends Agregado {
  private constructor(
    private readonly identificador: IdentificadorEmpleado,
    private nombreCompleto: NombreCompletoEmpleado,
    private correoElectronico: CorreoElectronicoEmpleado,
    private numeroTelefonico: NumeroTelefonicoEmpleado,
    private nivelEducativo: NivelEducativoEmpleado,
    private estatus: EstatusEmpleado,
    private genero: GeneroEmpleado,
    private fechaNacimiento: FechaNacimientoEmpleado,
    private direccion: Direccion,
    private experienciasLaborales?: ExperienciaLaboral[],
    private identificadoresHabilidades?: IdentificadorHabilidad[],
  ) {
    super()
  }

  public esIgual(empleado: Empleado): boolean {
    return this.identificador.esIgual(empleado.obtenerIdentificador())
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

  public obtenerExperienciasLaborales() {
    return this.experienciasLaborales
  }

  public agregarExperienciaLaboral(experienciaLaboral: ExperienciaLaboral) {
    this.experienciasLaborales.push(experienciaLaboral)
    this.agregarEvento({
      fecha: new Date(),
      nombre: 'ExperienciaLaboralEmpleadoRegistrada',
      datos: {
        idEmpleado: this.identificador.obtenerId(),
        idExperiencia: experienciaLaboral.obtenerIdentificador().obtenerId(),
      },
    })
  }

  private ubicarIndiceExperienciaLaboral(
    identificador: IdentificadorExperienciaLaboral,
  ): number {
    const indice = this.experienciasLaborales.findIndex((experiencia) =>
      experiencia.obtenerIdentificador().esIgual(identificador),
    )

    if (indice == -1) {
      throw new ExperienciaLaboralNoExiste(
        'La experiencia laboral especificada no existe.',
      )
    }

    return indice
  }

  public obtenerExperienciaLaboral(
    identificador: IdentificadorExperienciaLaboral,
  ): ExperienciaLaboral {
    const indice = this.ubicarIndiceExperienciaLaboral(identificador)
    return this.experienciasLaborales[indice]
  }

  public editarExperienciaLaboral(experienciaLaboral: ExperienciaLaboral) {
    const indice = this.ubicarIndiceExperienciaLaboral(
      experienciaLaboral.obtenerIdentificador(),
    )

    this.experienciasLaborales[indice] = experienciaLaboral

    this.agregarEvento({
      fecha: new Date(),
      nombre: 'ExperienciaLaboralEmpleadoActualizada',
      datos: {
        idEmpleado: this.identificador.obtenerId(),
        idExperiencia: experienciaLaboral.obtenerIdentificador().obtenerId(),
      },
    })
  }

  public eliminarExperienciaLaboral(
    identificador: IdentificadorExperienciaLaboral,
  ) {
    const indice = this.ubicarIndiceExperienciaLaboral(identificador)

    this.experienciasLaborales.splice(indice, 1)

    this.agregarEvento({
      fecha: new Date(),
      nombre: 'ExperienciaLaboralEmpleadoEliminada',
      datos: {
        idEmpleado: this.identificador.obtenerId(),
        idExperiencia: identificador.obtenerId(),
      },
    })
  }

  public actualizarHabilidades(
    identificadoresHabilidades: IdentificadorHabilidad[],
  ) {
    this.identificadoresHabilidades = identificadoresHabilidades

    this.agregarEvento({
      fecha: new Date(),
      nombre: 'HabilidadesEmpleadoActualizadas',
      datos: {
        idEmpleado: this.identificador.obtenerId(),
      },
    })
  }

  public obtenerIdentificadoresHabilidades() {
    return this.identificadoresHabilidades
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
      [],
      [],
    )

    empleado.agregarEvento({
      fecha: new Date(),
      nombre: 'EmpleadoRegistrado',
      datos: {
        idEmpleado: empleado.identificador.obtenerId(),
      },
    })

    return empleado
  }

  public static restaurar(datos: DatosEmpleado): Empleado {
    return new Empleado(
      datos.identificador,
      datos.nombreCompleto,
      datos.correoElectronico,
      datos.numeroTelefonico,
      datos.nivelEducativo,
      datos.estatus,
      datos.genero,
      datos.fechaNacimiento,
      datos.direccion,
      datos.experienciasLaborales || [],
      datos.identificadoresHabilidades || [],
    )
  }
}
