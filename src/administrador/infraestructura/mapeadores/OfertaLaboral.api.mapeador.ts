import { MapeadorFecha } from '../../../comun/infraestructura/mapeadores/Fecha.mapeador'
import { CrearOfertaLaboralAdministradorSolicitudDTO } from '../../aplicacion/dto/CrearOfertaLaboralAdministrador.dto'
import { CrearOfertaLaboralEmpresaApiDTO } from '../dto/CrearOfertaLaboralEmpresa.api.dto'
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
    http: CrearOfertaLaboralEmpresaApiDTO,
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

  // Mapear solicitud http para ver datos basicos de ofertas laborales activas al DTO de capa de aplicacion respectivo
/*   public static transformarSolicitudHttpVerOfertasLaboralesActivas(
    uuidEmpresa: string,
  ): VerOfertasLaboralesActivasSolicitudDTO {
    return {
      idEmpresa: uuidEmpresa,
    }
  } */

  // Mapear respuesta de capa de aplicación de datos basicos de ofertas laborales activas al DTO de capa de infraestructura
 /*  public static transformarRespuestaVerOfertasLaboralesActivas(
    ofertas: VerOfertasLaboralesActivasRespuestaDTO[],
  ): OfertasLaboralesActivasEmpresaApiDTO[] {
    return ofertas.map((oferta) => {
      return {
        uuid: oferta.id,
        titulo: oferta.titulo,
        fechaPublicacion: MapeadorFecha.formatear(oferta.fechaPublicacion),
        cargo: oferta.cargo,
        sueldo: oferta.sueldo,
        duracionEstimadaValor: oferta.duracionEstimadaValor,
        duracionEstimadaEscala: oferta.duracionEstimadaEscala,
        turnoTrabajo: oferta.turnoTrabajo,
        numeroVacantes: oferta.numeroVacantes,
      }
    })
  } */

  // Mapear solicitud http para ver detalles de una oferta laboral
  // al DTO de capa de aplicación respectivo
 /*  public static transformarSolicitudHttpVerDetalleOfertaLaboral(
    idEmpresa: string,
    idOferta: string,
  ): VerDetalleOfertaLaboralSolicitudDTO {
    return {
      idEmpresa,
      idOferta,
    }
  } */

  // Mapear respuesta de capa de aplicacion de detalles de una oferta laboral
  // al DTO de capa de infraestructura
/*   public static transformarRespuestaVerDetalleOfertaLaboral(
    oferta: VerDetalleOfertaLaboralRespuestaDTO,
  ): DetalleOfertaLaboralEmpresaApiDTO {
    return {
      uuid: oferta.id,
      cargo: oferta.cargo,
      descripcion: oferta.descripcion,
      duracionEstimadaEscala: oferta.duracionEstimadaEscala,
      duracionEstimadaValor: oferta.duracionEstimadaValor,
      fechaPublicacion: MapeadorFecha.formatear(oferta.fechaPublicacion),
      turnoTrabajo: oferta.turno,
      titulo: oferta.titulo,
      sueldo: oferta.sueldo,
      numeroVacantes: oferta.numeroVacantes,
      fechaModificacion: oferta.fechaModificacion
        ? MapeadorFecha.formatear(oferta.fechaModificacion)
        : null,
    }
  } */
}
