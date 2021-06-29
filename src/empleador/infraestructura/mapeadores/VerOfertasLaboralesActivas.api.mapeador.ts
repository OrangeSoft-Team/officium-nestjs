import { MapeadorFecha } from '../../../comun/infraestructura/mapeadores/Fecha.mapeador'
import {
  VerOfertasLaboralesActivasRespuestaDTO,
  VerOfertasLaboralesActivasSolicitudDTO,
} from '../../aplicacion/dto/VerOfertasLaborales.dto'
import { OfertasLaboralesActivasEmpresaApiDTO } from '../dto/VerOfertasLaboralesActivasEmpresa.api.dto'

export class VerOfertasLaboralesActivasAPIMapeador {
  public static httpSolicitud(
    uuidEmpresa: string,
  ): VerOfertasLaboralesActivasSolicitudDTO {
    return {
      idEmpresa: uuidEmpresa,
    }
  }

  public static respuestaHttp(
    ofertas: VerOfertasLaboralesActivasRespuestaDTO[],
  ): OfertasLaboralesActivasEmpresaApiDTO[] {
    const http = []
    ofertas.forEach((oferta) =>
      http.push({
        uuid: oferta.id,
        titulo: oferta.titulo,
        fechaPublicacion: MapeadorFecha.formatear(oferta.fechaPublicacion),
        cargo: oferta.cargo,
        sueldo: oferta.sueldo,
        duracionEstimadaValor: oferta.duracionEstimadaValor,
        duracionEstimadaEscala: oferta.duracionEstimadaEscala,
        turnoTrabajo: oferta.turnoTrabajo,
        numeroVacantes: oferta.numeroVacantes,
      }),
    )
    return http
  }
}
