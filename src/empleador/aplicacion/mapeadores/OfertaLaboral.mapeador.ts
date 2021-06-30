import { Identificador } from '../../../comun/dominio/values/Identificador'
import { OfertaLaboral } from '../../dominio/OfertaLaboral'
import { CargoOferta } from '../../dominio/values/oferta/CargoOferta'
import { DescripcionOferta } from '../../dominio/values/oferta/DescripcionOferta'
import { DuracionOferta } from '../../dominio/values/oferta/DuracionOferta'
import { EstadoOferta } from '../../dominio/values/oferta/EstadoOferta'
import { FechaModificacionOferta } from '../../dominio/values/oferta/FechaModificacionOferta'
import { FechaPublicacionOferta } from '../../dominio/values/oferta/FechaPublicacionOferta'
import { NumeroVacantesOferta } from '../../dominio/values/oferta/NumeroVacantesOferta'
import { SueldoOferta } from '../../dominio/values/oferta/SueldoOferta'
import { TituloOferta } from '../../dominio/values/oferta/TituloOferta'
import { TurnoOferta } from '../../dominio/values/oferta/TurnoOferta'
import { CrearOfertaLaboralEntidadDTO } from '../dto/CrearOfertaLaboral.dto'
import { VerDetalleOfertaLaboralRespuestaDTO } from '../dto/VerDetalleOfertaLaboral.dto'
import { VerOfertasLaboralesActivasRespuestaDTO } from '../dto/VerOfertasLaborales.dto'
import { OfertaLaboralPersistenciaDTO } from '../puertos/IRepositorioOfertaLaboral'

export class OfertaLaboralMapeador {
  // Mapear DTO de solicitud para la creación de una oferta laboral
  // a una entidad de dominio
  public static crearEntidadPorSolicitud(
    solicitud: CrearOfertaLaboralEntidadDTO,
  ): OfertaLaboral {
    return OfertaLaboral.crear({
      identificador: Identificador.crear(solicitud.id),
      titulo: TituloOferta.crear(solicitud.titulo),
      cargo: CargoOferta.crear(solicitud.cargo),
      descripcion: DescripcionOferta.crear(solicitud.descripcion),
      duracion: DuracionOferta.crear(
        solicitud.duracionEstimadaValor,
        solicitud.duracionEstimadaEscala,
      ),
      turno: TurnoOferta.crear(solicitud.turnoTrabajo),
      numeroVacantes: NumeroVacantesOferta.crear(solicitud.numeroVacantes),
      sueldo: SueldoOferta.crear(solicitud.sueldo),
      estado: EstadoOferta.crear('publicado'),
      fechaPublicacion: FechaPublicacionOferta.crear(new Date()),
    })
  }

  // Mapear DTO de persistencia a una entidad de dominio (oferta laboral)
  public static transformarPersistenciaEnEntidad(
    datos: OfertaLaboralPersistenciaDTO,
  ): OfertaLaboral {
    return OfertaLaboral.crear({
      identificador: Identificador.crear(datos.id),
      titulo: TituloOferta.crear(datos.titulo),
      cargo: CargoOferta.crear(datos.cargo),
      descripcion: DescripcionOferta.crear(datos.descripcion),
      duracion: DuracionOferta.crear(
        datos.duracionEstimada,
        datos.escalaDuracion,
      ),
      turno: TurnoOferta.crear(datos.turno),
      numeroVacantes: NumeroVacantesOferta.crear(datos.numeroVacantes),
      sueldo: SueldoOferta.crear(datos.sueldo),
      estado: EstadoOferta.crear(datos.estado),
      fechaPublicacion: FechaPublicacionOferta.crear(datos.fechaPublicacion),
      fechaModificacion: datos.fechaModificacion
        ? FechaModificacionOferta.crear(datos.fechaModificacion)
        : null,
    })
  }

  // Mapear varios DTOs de persistencia a varias entidades de dominio (oferta laboral)
  public static transformarPersistenciaEnEntidades(
    datos: OfertaLaboralPersistenciaDTO[],
  ): OfertaLaboral[] {
    return datos.map((oferta) => this.transformarPersistenciaEnEntidad(oferta))
  }

  // Mapear entidad de dominio (oferta laboral) al DTO de persistencia
  public static transformarEntidadEnPersistencia(
    entidad: OfertaLaboral,
    idEmpresa: string,
  ): OfertaLaboralPersistenciaDTO {
    return {
      idEmpresa,
      id: entidad.obtenerIdentificador().obtenerId(),
      cargo: entidad.obtenerCargo().obtenerCargo(),
      descripcion: entidad.obtenerDescripcion().obtenerDescripcion(),
      titulo: entidad.obtenerTitulo().obtenerTitulo(),
      turno: entidad.obtenerTurno().obtenerTurno(),
      estado: entidad.obtenerEstado().obtenerEstado(),
      duracionEstimada: entidad.obtenerDuracion().obtenerDuracion(),
      escalaDuracion: entidad.obtenerDuracion().obtenerEscala(),
      sueldo: entidad.obtenerSueldo().obtenerSueldo(),
      numeroVacantes: entidad.obtenerNumeroVacantes().obtenerNumero(),
      fechaPublicacion: entidad.obtenerFechaPublicacion().obtenerFecha(),
      fechaModificacion: entidad.obtenerFechaModificacion()?.obtenerFecha(),
    }
  }

  // Mapear entidad de dominio a DTO de respuesta básico (sin detalles)
  public static transformarEntidadEnRespuestaBasica(
    entidad: OfertaLaboral,
  ): VerOfertasLaboralesActivasRespuestaDTO {
    return {
      id: entidad.obtenerIdentificador().obtenerId(),
      cargo: entidad.obtenerCargo().obtenerCargo(),
      titulo: entidad.obtenerTitulo().obtenerTitulo(),
      sueldo: entidad.obtenerSueldo().obtenerSueldo(),
      turnoTrabajo: entidad.obtenerTurno().obtenerTurno(),
      numeroVacantes: entidad.obtenerNumeroVacantes().obtenerNumero(),
      duracionEstimadaValor: entidad.obtenerDuracion().obtenerDuracion(),
      duracionEstimadaEscala: entidad.obtenerDuracion().obtenerEscala(),
      fechaPublicacion: entidad.obtenerFechaPublicacion().obtenerFecha(),
    }
  }

  // Mapear varias entidades de dominio en varios DTOs de respiesta básica (sin detalles)
  public static transformarEntidadesEnRespuestasBasicas(
    entidades: OfertaLaboral[],
  ): VerOfertasLaboralesActivasRespuestaDTO[] {
    return entidades.map((entidad) =>
      this.transformarEntidadEnRespuestaBasica(entidad),
    )
  }

  // Mapear entidad de dominio a DTO de respuesta detallado (detalles de oferta)
  public static transformarEntidadEnRespuestaDetallada(
    entidad: OfertaLaboral,
  ): VerDetalleOfertaLaboralRespuestaDTO {
    return {
      id: entidad.obtenerIdentificador().obtenerId(),
      cargo: entidad.obtenerCargo().obtenerCargo(),
      descripcion: entidad.obtenerDescripcion().obtenerDescripcion(),
      duracionEstimadaEscala: entidad.obtenerDuracion().obtenerEscala(),
      duracionEstimadaValor: entidad.obtenerDuracion().obtenerDuracion(),
      fechaPublicacion: entidad.obtenerFechaPublicacion().obtenerFecha(),
      numeroVacantes: entidad.obtenerNumeroVacantes().obtenerNumero(),
      sueldo: entidad.obtenerSueldo().obtenerSueldo(),
      titulo: entidad.obtenerTitulo().obtenerTitulo(),
      turno: entidad.obtenerTurno().obtenerTurno(),
      fechaModificacion: entidad.obtenerFechaModificacion()?.obtenerFecha(),
    }
  }
}
