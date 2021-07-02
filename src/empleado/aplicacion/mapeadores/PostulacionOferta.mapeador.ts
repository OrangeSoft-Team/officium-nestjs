import { Identificador } from '../../../comun/dominio/values/Identificador'
import { PostulacionOferta } from '../../dominio/PostulacionOferta'
import { NombreEmpresa } from '../../dominio/values/Empresa/NombreEmpresa'
import { CargoOferta } from '../../dominio/values/oferta/CargoOferta'
import { TituloOferta } from '../../dominio/values/oferta/TituloOferta'
import { ComentarioPostulacion } from '../../dominio/values/postulacion/ComentarioPostulacion'
import { EstadoPostulacion } from '../../dominio/values/postulacion/EstadoPostulacion'
import { FechaPostulacion } from '../../dominio/values/postulacion/FechaPostulacion'
import { ConsultarPostulacionesDTO, DominioPostulacionDTO } from '../dto/postulacion/ConsultarPostulaciones.dto'
import { PostularseOfertaLaboralSolicitudDTO } from '../dto/postulacion/PostularseOfertaLaboral.dto'
import { ConsultarPostulacionesPersistenciaDTO, PostulacionOfertaPersistenciaDTO } from '../puertos/IRepositorioPostulaciones'

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


  public static MapPostulacionDominio(postulacion: ConsultarPostulacionesPersistenciaDTO): DominioPostulacionDTO {
      return{ 
          uuid: Identificador.crear(postulacion.uuid),
          uuidOfertaLaboral: Identificador.crear(postulacion.uuidOfertaLaboral),
          tituloOferta: TituloOferta.crear(postulacion.tituloOferta),
          cargoOferta: CargoOferta.crear(postulacion.cargoOferta),
          empresaNombre: NombreEmpresa.crear(postulacion.nombreEmpresa),
          estado: EstadoPostulacion.crear(postulacion.estado),
          fecha: FechaPostulacion.crear(postulacion.fecha),
          comentario: ComentarioPostulacion.crear(postulacion.comentario),
      }
  }

  public static MapPostulacionRespuesta(postulacion: DominioPostulacionDTO): ConsultarPostulacionesDTO{
    return {
      uuid: postulacion.uuid.obtenerId(),
      uuidOfertaLaboral: postulacion.uuidOfertaLaboral.obtenerId(),
      tituloOferta: postulacion.tituloOferta.obtenerTitulo(),
      cargoOferta: postulacion.cargoOferta.obtenerCargo(),
      empresaNombre: postulacion.empresaNombre.obtenerNombre(),
      comentario: postulacion.comentario.obtenerComentario()
    }
  }
}
