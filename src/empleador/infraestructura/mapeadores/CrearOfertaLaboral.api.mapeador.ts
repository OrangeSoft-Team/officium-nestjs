import { CrearOfertaLaboralSolicitudDTO } from '../../aplicacion/dto/CrearOfertaLaboral.dto'
import { CrearOfertaLaboralEmpresaApiDTO } from '../dto/CrearOfertaLaboralEmpresa.api.dto'

export class CrearOfertaLaboralAPIMapeador {
  // Mapear DTO http de infraestructura a DTO requerido por el servicio de capa de aplicacion
  public static httpSolicitud(
    datos: CrearOfertaLaboralEmpresaApiDTO,
  ): CrearOfertaLaboralSolicitudDTO {
    return {
      idEmpresa: datos?.uuidEmpresa,
      cargo: datos?.cargo,
      descripcion: datos?.descripcion,
      numeroVacantes: datos?.numeroVacantes,
      duracionEstimadaEscala: datos?.duracionEstimadaEscala,
      duracionEstimadaValor: datos?.duracionEstimadaValor,
      sueldo: datos?.sueldo,
      titulo: datos?.titulo,
      turnoTrabajo: datos?.turnoTrabajo,
    }
  }
}
