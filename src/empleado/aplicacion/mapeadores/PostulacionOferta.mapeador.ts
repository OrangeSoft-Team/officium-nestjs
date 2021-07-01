import { Identificador } from '../../../comun/dominio/values/Identificador'
import { PostulacionOferta } from '../../dominio/PostulacionOferta'
import { ComentarioPostulacion } from '../../dominio/values/postulacion/ComentarioPostulacion'
import { EstadoPostulacion } from '../../dominio/values/postulacion/EstadoPostulacion'
import { FechaPostulacion } from '../../dominio/values/postulacion/FechaPostulacion'
import { PostularseOfertaLaboralSolicitudDTO } from '../dto/PostularseOfertaLaboral.dto'
import { PostulacionOfertaPersistenciaDTO } from '../puertos/IRepositorioPostulaciones'

export class PostulacionOfertaMapeador {
  // Mapear DTO de solicitud para la creación de una postulación
  // a una entidad de dominio
  public static crearEntidadPorSolicitud(
    solicitud: PostularseOfertaLaboralSolicitudDTO,
    idPostulacion: string,
  ): PostulacionOferta {
    return PostulacionOferta.crear({
      identificador: Identificador.crear(idPostulacion),
      estado: EstadoPostulacion.crear('en proceso'),
      fecha: FechaPostulacion.crear(new Date()),
      comentario: solicitud.comentario
        ? ComentarioPostulacion.crear(solicitud.comentario)
        : null,
    })
  }

  // Mapear entidad (PostulacionOferta) en el DTO de persistencia
  public static transformarEntidadEnPersistencia(
    entidad: PostulacionOferta,
    idEmpleado: string,
    idOferta: string,
  ): PostulacionOfertaPersistenciaDTO {
    return {
      id: entidad.obtenerIdentificador().obtenerId(),
      idEmpleado,
      idOferta,
      fecha: entidad.obtenerFecha().obtenerFecha(),
      estado: entidad.obtenerEstado().obtenerEstado(),
      comentario: entidad.obtenerComentario()?.obtenerComentario(),
    }
  }
}
