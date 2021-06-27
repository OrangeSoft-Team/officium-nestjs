import { Identificador } from '../../../comun/dominio/values/Identificador'
import { DatosOfertaLaboral, OfertaLaboral } from '../../dominio/OfertaLaboral'
import { CargoOferta } from '../../dominio/values/oferta/CargoOferta'
import { DescripcionOferta } from '../../dominio/values/oferta/DescripcionOferta'
import { DuracionOferta } from '../../dominio/values/oferta/DuracionOferta'
import { EstadoOferta } from '../../dominio/values/oferta/EstadoOferta'
import { FechaPublicacionOferta } from '../../dominio/values/oferta/FechaPublicacionOferta'
import { NumeroVacantesOferta } from '../../dominio/values/oferta/NumeroVacantesOferta'
import { SueldoOferta } from '../../dominio/values/oferta/SueldoOferta'
import { TituloOferta } from '../../dominio/values/oferta/TituloOferta'
import { TurnoOferta } from '../../dominio/values/oferta/TurnoOferta'
import { CrearOfertaLaboralEntidadDTO } from '../dto/CrearOfertaLaboral.dto'
import { PersistirOfertaLaboralDTO } from '../puertos/IRepositorioOfertaLaboral'

export class CrearOfertaLaboralMapeador {
  // Mapear DTO de solicitud del servicio a la entidad de dominio
  public static solicitudEntidad(solicitud: CrearOfertaLaboralEntidadDTO) {
    const datos: DatosOfertaLaboral = {
      identificador: Identificador.crear(solicitud.id),
      titulo: TituloOferta.crear(solicitud.titulo),
      cargo: CargoOferta.crear(solicitud.cargo),
      descripcion: DescripcionOferta.crear(solicitud.descripcion),
      estado: EstadoOferta.crear('publicado'),
      turno: TurnoOferta.crear(solicitud.turnoTrabajo),
      numeroVacantes: NumeroVacantesOferta.crear(solicitud.numeroVacantes),
      sueldo: SueldoOferta.crear(solicitud.sueldo),
      fechaPublicacion: FechaPublicacionOferta.crear(new Date()),
      duracion: DuracionOferta.crear(
        solicitud.duracionEstimadaValor,
        solicitud.duracionEstimadaEscala,
      ),
    }
    return OfertaLaboral.crear(datos)
  }

  // Mapear entidad de dominio a los datos requeridos por la interfaz de persistencia
  public static entidadPersistencia(
    entidad: OfertaLaboral,
    idEmpresa: string,
  ): PersistirOfertaLaboralDTO {
    return {
      id: entidad.obtenerIdentificador().obtenerId(),
      cargo: entidad.obtenerCargo().obtenerCargo(),
      titulo: entidad.obtenerTitulo().obtenerTitulo(),
      descripcion: entidad.obtenerDescripcion().obtenerDescripcion(),
      duracionEstimada: entidad.obtenerDuracion().obtenerDuracion(),
      escalaDuracion: entidad.obtenerDuracion().obtenerEscala(),
      estado: entidad.obtenerEstado().obtenerEstado(),
      fechaPublicacion: entidad.obtenerFechaPublicacion().obtenerFecha(),
      numeroVacantes: entidad.obtenerNumeroVacantes().obtenerNumero(),
      sueldo: entidad.obtenerSueldo().obtenerSueldo(),
      turno: entidad.obtenerTurno().obtenerTurno(),
      idEmpresa: idEmpresa,
      fechaModificacion: entidad.obtenerFechaModificacion()?.obtenerFecha(),
    }
  }
}
