import { Agregado } from '../../../../comun/dominio/Agregado'
import { IdentificadorCurso } from '../values/curso/IdentificadorCurso'
import { EstatusEstudiante } from '../values/estudiante/EstatusEstudiante'
import { IdentificadorEstudiante } from '../values/estudiante/IdentificadorEstudiante'

export interface DatosEmpleado {
  identificador: IdentificadorEstudiante
  estatus: EstatusEstudiante
}

export class Estudiante extends Agregado {
  private constructor(
    private readonly identificador: IdentificadorEstudiante,
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

  public obtenerEstatus() {
    return this.estatus
  }


  public agregarCurso(
    idCurso: IdentificadorCurso
  ){
    this.agregarEvento({
      fecha: new Date(),
      nombre: 'EmpleadoCursoInscrito',
      datos: {
        idEmpleado: this.obtenerIdentificador().obtenerId(),
        idCurso: idCurso.obtenerId(),
      }
    })
  }

  public static crear(datos: DatosEmpleado): Estudiante {
    const estudiante = new Estudiante(
      datos.identificador,
      datos.estatus,
    )
    return estudiante
  }

  public static restaurar(datos: DatosEmpleado): Estudiante {
    return new Estudiante(
      datos.identificador,
      datos.estatus,
    )
  }
}
