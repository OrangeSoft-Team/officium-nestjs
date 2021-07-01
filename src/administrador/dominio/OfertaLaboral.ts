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
    private fechaModificacion?: FechaModificacionOferta
  ) {
    super(identificador)
  }

  // getters
  public obtenerTitulo() {
    return this.titulo
  }
  public obtenerCargo() {
    return this.cargo
  }
  public obtenerTurno() {
    return this.turno
  }
  public obtenerDescripcion() {
    return this.descripcion
  }
  public obtenerDuracion() {
    return this.duracion
  }
  public obtenerEstado() {
    return this.estado
  }
  public obtenerFechaPublicacion() {
    return this.fechaPublicacion
  }
  public obtenerNumeroVacantes() {
    return this.numeroVacantes
  }
  public obtenerSueldo() {
    return this.sueldo
  }
  public obtenerFechaModificacion() {
    return this.fechaModificacion
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
