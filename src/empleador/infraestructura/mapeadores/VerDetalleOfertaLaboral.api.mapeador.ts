import { MapeadorFecha } from '../../../comun/infraestructura/mapeadores/Fecha.mapeador'
import {
  VerDetalleOfertaLaboralRespuestaDTO,
  VerDetalleOfertaLaboralSolicitudDTO,
} from '../../aplicacion/dto/VerDetalleOfertaLaboral.dto'
import { DetalleOfertaLaboralEmpresaApiDTO } from '../dto/VerDetalleOfertaLaboral.api.dto'

export class VerDetalleOfertaLaboralAPIMapeador {
  public static httpSolicitud(
    uuidEmpresa: string,
    uuidOfertaLaboral: string,
  ): VerDetalleOfertaLaboralSolicitudDTO {
    return {
      idEmpresa: uuidEmpresa,
      idOferta: uuidOfertaLaboral,
    }
  }

  public static respuestaHttp(
    dto: VerDetalleOfertaLaboralRespuestaDTO,
  ): DetalleOfertaLaboralEmpresaApiDTO {
    return {
      uuid: dto.id,
      cargo: dto.cargo,
      descripcion: dto.descripcion,
      duracionEstimadaEscala: dto.duracionEstimadaEscala,
      duracionEstimadaValor: dto.duracionEstimadaValor,
      fechaPublicacion: MapeadorFecha.formatear(dto.fechaPublicacion),
      turnoTrabajo: dto.turno,
      titulo: dto.titulo,
      sueldo: dto.sueldo,
      numeroVacantes: dto.numeroVacantes,
      fechaModificacion: dto.fechaModificacion
        ? MapeadorFecha.formatear(dto.fechaModificacion)
        : null,
    }
  }
}
