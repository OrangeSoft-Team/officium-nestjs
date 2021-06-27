import { CrearOfertaLaboralSolicitudDTO } from '../../aplicacion/dto/CrearOfertaLaboral.dto'
import { CrearOfertaLaboralEmpresaApiDTO } from '../dto/CrearOfertaLaboralEmpresa.api.dto'

export class CrearOfertaLaboralAPIMapeador {
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
