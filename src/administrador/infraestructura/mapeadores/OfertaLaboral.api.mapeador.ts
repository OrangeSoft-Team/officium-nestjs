import { MapeadorFecha } from '../../../comun/infraestructura/mapeadores/Fecha.mapeador'
import { CrearOfertaLaboralAdministradorSolicitudDTO } from '../../aplicacion/dto/CrearOfertaLaboralAdministrador.dto'
import { CrearOfertaLaboralEmpresaAdministradorApiDTO } from '../dto/CrearOfertaLaboralEmpresaAdministrador.api.dto'
import { ConsultarOfertasLaboralesAdministradorDTO } from '../../aplicacion/dto/ConsultarOfertasLaboralesAdministrador.dto'
import { ConsultarOfertasLaboralesAdministradorAPIDTO } from '../dto/ConsultarOfertasLaboralesAdministrador.api.dto'
/* 
import {
  VerDetalleOfertaLaboralRespuestaDTO,
  VerDetalleOfertaLaboralSolicitudDTO,
} from '../../aplicacion/dto/VerDetalleOfertaLaboral.dto'

import {
  VerOfertasLaboralesActivasRespuestaDTO,
  VerOfertasLaboralesActivasSolicitudDTO,
} from '../../aplicacion/dto/VerOfertasLaborales.dto'
import { DetalleOfertaLaboralEmpresaApiDTO } from '../dto/VerDetalleOfertaLaboral.api.dto'
import { OfertasLaboralesActivasEmpresaApiDTO } from '../dto/VerOfertasLaboralesActivasEmpresa.api.dto' */

export class OfertaLaboralAPIMapeador {
  // Mapear solicitud http para crear una oferta al DTO de capa de aplicación respectivo
  public static transformarSolicitudHttpCrearOfertaLaboral(
    http: CrearOfertaLaboralEmpresaAdministradorApiDTO,
  ): CrearOfertaLaboralAdministradorSolicitudDTO {
    return {
      idEmpresa: http.uuidEmpresa,
      cargo: http.cargo,
      descripcion: http.descripcion,
      numeroVacantes: http.numeroVacantes,
      duracionEstimadaEscala: http.duracionEstimadaEscala,
      duracionEstimadaValor: http.duracionEstimadaValor,
      sueldo: http.sueldo,
      titulo: http.titulo,
      turnoTrabajo: http.turnoTrabajo,
    }
  }

  public static ConsultarOfertasRespuestaHttp(
    datos: ConsultarOfertasLaboralesAdministradorDTO[],
  ): ConsultarOfertasLaboralesAdministradorAPIDTO[] {
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
}
