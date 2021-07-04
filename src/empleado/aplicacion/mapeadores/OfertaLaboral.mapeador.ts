import { Identificador } from '../../../comun/dominio/values/Identificador'
import { OfertaLaboral } from '../../dominio/OfertaLaboral'
import { CargoOferta } from '../../dominio/values/oferta/CargoOferta'
import { DescripcionOferta } from '../../dominio/values/oferta/DescripcionOferta'
import { DuracionOferta } from '../../dominio/values/oferta/DuracionOferta'
import { EstadoOferta } from '../../dominio/values/oferta/EstadoOferta'
import { FechaPublicacionOferta } from '../../dominio/values/oferta/FechaPublicacionOferta'
import { NumeroVacantesOferta } from '../../dominio/values/oferta/NumeroVacantesOferta'
import { SueldoOferta } from '../../dominio/values/oferta/SueldoOferta'
import { TituloOferta } from '../../dominio/values/oferta/TituloOferta'
import { TurnoOferta } from '../../dominio/values/oferta/TurnoOferta'
import { DatosOfertaLaboral } from '../../dominio/OfertaLaboral'
import { ConsultarOfertasLaboralesDTO } from '../dto/oferta/ConsultarOfertasLaborales.dto'
import {
  ConsultarOfertaLaboralPersistenciaDTO,
  VerDetallesOfertaLaboralPersistenciaDTO,
} from '../puertos/IRepositorioOfertaLaboral'
import { FechaModificacionOferta } from '../../dominio/values/oferta/FechaModificacionOferta'
import { NombreEmpresa } from '../../dominio/values/empresa/NombreEmpresa'
import {
  DominioDetallesOfertaLaboralDTO,
  VerDetallesOfertaLaboralDTO,
} from '../dto/oferta/VerDetallesOfertaLaboral.dto'
import { CalleDireccion } from '../../../comun/dominio/values/CalleDireccion'
import { CodigoPostalDireccion } from '../../../comun/dominio/values/CodigoPostalDireccion'
import { NombreCiudad } from '../../../comun/dominio/values/NombreCiudad'

export class OfertaLaboralMapeador {
  public static MapConsultaDominioOferta(
    oferta: ConsultarOfertaLaboralPersistenciaDTO,
  ): DatosOfertaLaboral & { nombreEmpresa: NombreEmpresa } {
    //Mapea la respuesta al dominio para validar los valores
    return {
      identificador: Identificador.crear(oferta.id),
      titulo: TituloOferta.crear(oferta.titulo),
      cargo: CargoOferta.crear(oferta.cargo),
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
      nombreEmpresa: NombreEmpresa.crear(oferta.nombreEmpresa),
    }
  }

  public static MapConsultaRespuestaOferta(
    oferta: DatosOfertaLaboral & { nombreEmpresa: NombreEmpresa },
  ): ConsultarOfertasLaboralesDTO {
    const ofertas = OfertaLaboral.crear(oferta)
    return {
      id: ofertas.obtenerIdentificador().obtenerId(),
      cargo: ofertas.obtenerCargo().obtenerCargo(),
      duracionEstimadaEscala: ofertas.obtenerDuracion().obtenerEscala(),
      duracionEstimadaValor: ofertas.obtenerDuracion().obtenerDuracion(),
      fecha: ofertas.obtenerFechaPublicacion().obtenerFecha(),
      numeroVacantes: ofertas.obtenerNumeroVacantes().obtenerNumero(),
      sueldo: ofertas.obtenerSueldo().obtenerSueldo(),
      titulo: ofertas.obtenerTitulo().obtenerTitulo(),
      turnoTrabajo: ofertas.obtenerTurno().obtenerTurno(),
      nombreEmpresa: oferta.nombreEmpresa.obtenerNombre(),
    }
  }

  public static MapDetalleDominioOferta(
    oferta: VerDetallesOfertaLaboralPersistenciaDTO,
  ): DatosOfertaLaboral & DominioDetallesOfertaLaboralDTO {
    //Mapea la respuesta al dominio para validar los valores
    return {
      identificador: Identificador.crear(oferta.id),
      titulo: TituloOferta.crear(oferta.titulo),
      cargo: CargoOferta.crear(oferta.cargo),
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
      uuidEmpresa: Identificador.crear(oferta.uuidEmpresa),
      nombreEmpresa: NombreEmpresa.crear(oferta.nombreEmpresa),
      calleEmpresa: CalleDireccion.crear(oferta.calleEmpresa),
      codigoPostalEmpresa: CodigoPostalDireccion.crear(
        oferta.codigoPostalEmpresa,
      ),
      ciudadEmpresa: NombreCiudad.crear(oferta.ciudadEmpresa),
    }
  }

  public static MapDetalleRespuestaOferta(
    oferta: DatosOfertaLaboral & DominioDetallesOfertaLaboralDTO,
  ): VerDetallesOfertaLaboralDTO {
    return {
      id: oferta.identificador.obtenerId(),
      titulo: oferta.titulo.obtenerTitulo(),
      fechaPublicacion: oferta.fechaPublicacion.obtenerFecha(),
      fechaModificacion: oferta.fechaModificacion?.obtenerFecha(),
      cargo: oferta.cargo.obtenerCargo(),
      sueldo: oferta.sueldo.obtenerSueldo(),
      descripcion: oferta.descripcion.obtenerDescripcion(),
      duracionEstimadaValor: oferta.duracion.obtenerDuracion(),
      duracionEstimadaEscala: oferta.duracion.obtenerEscala(),
      turnoTrabajo: oferta.turno.obtenerTurno(),
      numeroVacantes: oferta.numeroVacantes.obtenerNumero(),
      uuidEmpresa: oferta.uuidEmpresa.obtenerId(),
      nombreEmpresa: oferta.nombreEmpresa.obtenerNombre(),
      direccionEmpresa: this.obtenerDireccion(oferta),
    }
  }

  private static obtenerDireccion(direccion: DominioDetallesOfertaLaboralDTO) {
    return (
      direccion.calleEmpresa.obtenerCalle() +
      ', ' +
      direccion.codigoPostalEmpresa.obtenerCodigoPostal() +
      ', ' +
      direccion.ciudadEmpresa.obtenerNombre()
    )
  }
}
