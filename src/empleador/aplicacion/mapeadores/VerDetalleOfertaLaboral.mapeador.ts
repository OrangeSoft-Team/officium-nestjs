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
import { VerDetalleOfertaLaboralRespuestaDTO } from '../dto/VerDetalleOfertaLaboral.dto'
import { OfertaLaboralPersistenciaDTO } from '../puertos/IRepositorioOfertaLaboral'

export class VerDetalleOfertaLaboralMapeador {
  public static persistenciaEntidad(
    datos: OfertaLaboralPersistenciaDTO,
  ): OfertaLaboral {
    return OfertaLaboral.crear({
      identificador: Identificador.crear(datos.id),
      titulo: TituloOferta.crear(datos.titulo),
      cargo: CargoOferta.crear(datos.cargo),
      descripcion: DescripcionOferta.crear(datos.descripcion),
      estado: EstadoOferta.crear(datos.estado),
      turno: TurnoOferta.crear(datos.turno),
      numeroVacantes: NumeroVacantesOferta.crear(datos.numeroVacantes),
      sueldo: SueldoOferta.crear(datos.sueldo),
      fechaPublicacion: FechaPublicacionOferta.crear(datos.fechaPublicacion),
      duracion: DuracionOferta.crear(
        datos.duracionEstimada,
        datos.escalaDuracion,
      ),
      fechaModificacion: datos.fechaModificacion
        ? FechaModificacionOferta.crear(datos.fechaModificacion)
        : null,
    })
  }

  // Mapear datos de entidad (OfertaLaboral) al DTO de respuesta
  public static entidadRespuesta(
    oferta: OfertaLaboral,
  ): VerDetalleOfertaLaboralRespuestaDTO {
    return {
      id: oferta.obtenerIdentificador().obtenerId(),
      cargo: oferta.obtenerCargo().obtenerCargo(),
      descripcion: oferta.obtenerDescripcion().obtenerDescripcion(),
      duracionEstimadaEscala: oferta.obtenerDuracion().obtenerEscala(),
      duracionEstimadaValor: oferta.obtenerDuracion().obtenerDuracion(),
      fechaPublicacion: oferta.obtenerFechaPublicacion().obtenerFecha(),
      numeroVacantes: oferta.obtenerNumeroVacantes().obtenerNumero(),
      sueldo: oferta.obtenerSueldo().obtenerSueldo(),
      titulo: oferta.obtenerTitulo().obtenerTitulo(),
      turno: oferta.obtenerTurno().obtenerTurno(),
      fechaModificacion: oferta.obtenerFechaModificacion()?.obtenerFecha(),
    }
  }
}
