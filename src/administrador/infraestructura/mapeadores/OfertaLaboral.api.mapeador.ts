import { MapeadorFecha } from '../../../comun/infraestructura/mapeadores/Fecha.mapeador'
import { CrearOfertaLaboralAdministradorSolicitudDTO } from '../../aplicacion/dto/oferta/CrearOfertaLaboralAdministrador.dto'
import { CrearOfertaLaboralEmpresaAdministradorApiDTO } from '../dto/oferta/CrearOfertaLaboralEmpresaAdministrador.api.dto'
import { ConsultarOfertasLaboralesAdministradorDTO } from '../../aplicacion/dto/oferta/ConsultarOfertasLaboralesAdministrador.dto'
import { ConsultarOfertasLaboralesAdministradorAPIDTO } from '../dto/oferta/ConsultarOfertasLaboralesAdministrador.api.dto'
import { VerDetallesOfertaLaboralAdministradorAPIDTO } from '../dto/oferta/VerDetalllesOfertaLaboralAdministrador.api.dto'
import {
  VerDetallesOfertaLaboralAdministradorDTO,
  VerDetallesOfertaLaboralAdministradorPeticionDTO,
} from '../../aplicacion/dto/oferta/VerDetallesOfertaLaboralAdministrador.dto'
/*
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

  public static VerDetallesOfertaAdministradorPeticionHttp(
    uuid_oferta_laboral: string,
  ): VerDetallesOfertaLaboralAdministradorPeticionDTO {
    return { idOferta: uuid_oferta_laboral }
  }

  public static VerDetallesOfertaAdministradorRespuestaHttp(
    oferta: VerDetallesOfertaLaboralAdministradorDTO,
  ): VerDetallesOfertaLaboralAdministradorAPIDTO {
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
