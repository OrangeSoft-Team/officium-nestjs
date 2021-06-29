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
import { VerOfertasLaboralesActivasRespuestaDTO } from '../dto/VerOfertasLaborales.dto'
import { OfertaLaboralPersistenciaDTO } from '../puertos/IRepositorioOfertaLaboral'

export class VerOfertasLaboralesActivasMapeador {
  // Mapear datos de persitencia a las entidades Oferta laboral de dominio
  public static persitenciaEntidades(
    ofertas: OfertaLaboralPersistenciaDTO[],
  ): OfertaLaboral[] {
    return ofertas.map((oferta) =>
      OfertaLaboral.crear({
        identificador: Identificador.crear(oferta.id),
        titulo: TituloOferta.crear(oferta.titulo),
        cargo: CargoOferta.crear(oferta.titulo),
        descripcion: DescripcionOferta.crear(oferta.descripcion),
        estado: EstadoOferta.crear(oferta.estado),
        turno: TurnoOferta.crear(oferta.turno),
        numeroVacantes: NumeroVacantesOferta.crear(oferta.numeroVacantes),
        sueldo: SueldoOferta.crear(oferta.sueldo),
        fechaPublicacion: FechaPublicacionOferta.crear(oferta.fechaPublicacion),
        duracion: DuracionOferta.crear(
          oferta.duracionEstimada,
          oferta.escalaDuracion,
        ),
        fechaModificacion: oferta.fechaModificacion
          ? FechaModificacionOferta.crear(oferta.fechaModificacion)
          : null,
      }),
    )
  }

  // Mapear datos de entidades (OfertaLaboral) al DTO de respuesta
  public static entidadesRespuesta(
    ofertas: OfertaLaboral[],
  ): VerOfertasLaboralesActivasRespuestaDTO[] {
    return ofertas.map((oferta) => {
      return {
        id: oferta.obtenerIdentificador().obtenerId(),
        cargo: oferta.obtenerCargo().obtenerCargo(),
        duracionEstimadaEscala: oferta.obtenerDuracion().obtenerEscala(),
        duracionEstimadaValor: oferta.obtenerDuracion().obtenerDuracion(),
        fechaPublicacion: oferta.obtenerFechaPublicacion().obtenerFecha(),
        numeroVacantes: oferta.obtenerNumeroVacantes().obtenerNumero(),
        sueldo: oferta.obtenerSueldo().obtenerSueldo(),
        titulo: oferta.obtenerTitulo().obtenerTitulo(),
        turnoTrabajo: oferta.obtenerTurno().obtenerTurno(),
      }
    })
  }
}
