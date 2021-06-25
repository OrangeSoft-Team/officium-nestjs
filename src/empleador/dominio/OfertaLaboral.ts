import { Identificador } from '../../comun/dominio/values/Identificador'
import { Entidad } from '../../comun/dominio/Entidad'
import { CargoOferta } from './values/oferta/CargoOferta'
import { DescripcionOferta } from './values/oferta/DescripcionOferta'
import { DuracionOferta } from './values/oferta/DuracionOferta'
import { EstadoOferta } from './values/oferta/EstadoOferta'
import { FechaModificacionOferta } from './values/oferta/FechaModificacionOferta'
import { FechaPublicacionOferta } from './values/oferta/FechaPublicacionOferta'
import { NumeroVacantesOferta } from './values/oferta/NumeroVacantesOferta'
import { SueldoOferta } from './values/oferta/SueldoOferta'
import { TituloOferta } from './values/oferta/TituloOferta'
import { TurnoOferta } from './values/oferta/TurnoOferta'

export interface DatosOfertaLaboral {
  identificador: Identificador
  titulo: TituloOferta
  cargo: CargoOferta
  turno: TurnoOferta
  descripcion: DescripcionOferta
  duracion: DuracionOferta
  estado: EstadoOferta
  fechaPublicacion: FechaPublicacionOferta
  numeroVacantes: NumeroVacantesOferta
  sueldo: SueldoOferta
  fechaModificacion?: FechaModificacionOferta
}

export class OfertaLaboral extends Entidad {
  private constructor(
    identificador: Identificador,
    private titulo: TituloOferta,
    private cargo: CargoOferta,
    private turno: TurnoOferta,
    private descripcion: DescripcionOferta,
    private duracion: DuracionOferta,
    private estado: EstadoOferta,
    private fechaPublicacion: FechaPublicacionOferta,
    private numeroVacantes: NumeroVacantesOferta,
    private sueldo: SueldoOferta,
    private fechaModificacion?: FechaModificacionOferta,
  ) {
    super(identificador)
  }

  public static crear(datos: DatosOfertaLaboral): OfertaLaboral {
    return new OfertaLaboral(
      datos.identificador,
      datos.titulo,
      datos.cargo,
      datos.turno,
      datos.descripcion,
      datos.duracion,
      datos.estado,
      datos.fechaPublicacion,
      datos.numeroVacantes,
      datos.sueldo,
      datos.fechaModificacion,
    )
  }
}
