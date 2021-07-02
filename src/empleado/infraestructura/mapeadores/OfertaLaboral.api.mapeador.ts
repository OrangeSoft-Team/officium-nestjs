import { MapeadorFecha } from '../../../comun/infraestructura/mapeadores/Fecha.mapeador'
import { ConsultarOfertasLaboralesDTO } from '../../aplicacion/dto/oferta/ConsultarOfertasLaborales.dto'
import {
  VerDetallesOfertaLaboralDTO,
  VerDetallesOfertaLaboralPeticionDTO,
} from '../../aplicacion/dto/oferta/VerDetallesOfertaLaboral.dto'
import { ConsultarOfertasLaboralesAPIDTO } from '../dto/oferta/ConsultarOfertasLaborales.api.dto'
import { VerDetallesOfertaLaboralAPIDTO } from '../dto/oferta/VerDetalllesOfertaLaboral.api.dto'

export class OfertaLaboralAPIMapeador {
  public static ConsultarOfertasRespuestaHttp(
    datos: ConsultarOfertasLaboralesDTO[],
  ): ConsultarOfertasLaboralesAPIDTO[] {
    //Mapea la respuesta del caso de uso al formato que responde el API
    const http = []
    datos.forEach((oferta) =>
      http.push({
        uuid: oferta.id,
        titulo: oferta.titulo,
        fechaPublicacion: MapeadorFecha.formatear(oferta.fecha),
        cargo: oferta.cargo,
        sueldo: oferta.sueldo,
        duracionEstimadaValor: oferta.duracionEstimadaValor,
        duracionEstimadaEscala: oferta.duracionEstimadaEscala,
        turnoTrabajo: oferta.turnoTrabajo,
        numeroVacantes: oferta.numeroVacantes,
        empresaNombre: oferta.nombreEmpresa,
      }),
    )
    return http
  }

  public static VerDetallesOfertaPeticionHttp(
    uuid_oferta_laboral: string,
  ): VerDetallesOfertaLaboralPeticionDTO {
    return { idOferta: uuid_oferta_laboral }
  }

  public static VerDetallesOfertaRespuestaHttp(
    oferta: VerDetallesOfertaLaboralDTO,
  ): VerDetallesOfertaLaboralAPIDTO {
    //Mapea la respuesta del caso de uso al formato que responde el API
    return {
      uuid: oferta.id,
      titulo: oferta.titulo,
      fechaPublicacion: MapeadorFecha.formatear(oferta.fechaPublicacion),
      fechaModificacion: oferta.fechaModificacion
        ? MapeadorFecha.formatear(oferta.fechaModificacion)
        : null,
      cargo: oferta.cargo,
      sueldo: oferta.sueldo,
      descripcion: oferta.descripcion,
      duracionEstimadaValor: oferta.duracionEstimadaValor,
      duracionEstimadaEscala: oferta.duracionEstimadaEscala,
      turnoTrabajo: oferta.turnoTrabajo,
      numeroVacantes: oferta.numeroVacantes,
      uuidEmpresa: oferta.uuidEmpresa,
      empresaNombre: oferta.nombreEmpresa,
      direccionEmpresa: oferta.direccionEmpresa,
    }
  }
}
