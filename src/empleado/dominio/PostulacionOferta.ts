import { Entidad } from '../../comun/dominio/Entidad'
import { Identificador } from '../../comun/dominio/values/Identificador'
import { ComentarioPostulacion } from './values/postulacion/ComentarioPostulacion'
import { EstadoPostulacion } from './values/postulacion/EstadoPostulacion'
import { FechaPostulacion } from './values/postulacion/FechaPostulacion'

export interface DatosPostulacion {
  identificador: Identificador
  fecha: FechaPostulacion
  estado: EstadoPostulacion
  comentario?: ComentarioPostulacion
}

export class PostulacionOferta extends Entidad {
  private constructor(
    identificador: Identificador,
    private fecha: FechaPostulacion,
    private estado: EstadoPostulacion,
    private comentario?: ComentarioPostulacion,
  ) {
    super(identificador)
  }

  public obtenerFecha() {
    return this.fecha
  }

  public obtenerEstado() {
    return this.estado
  }

  public obtenerComentario() {
    return this.comentario
  }

  public static crear(datos: DatosPostulacion) {
    return new PostulacionOferta(
      datos.identificador,
      datos.fecha,
      datos.estado,
      datos.comentario,
    )
  }
}
