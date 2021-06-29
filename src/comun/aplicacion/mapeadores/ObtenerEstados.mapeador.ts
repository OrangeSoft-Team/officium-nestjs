import { Estado } from '../../dominio/Estado'
import { Identificador } from '../../dominio/values/Identificador'
import { NombreEstado } from '../../dominio/values/NombreEstado'
import { ObtenerEstadosRespuestaDTO } from '../dto/ObtenerEstados.dto'
import { EstadoPersistenciaDTO } from '../puertos/IRepositorioEstados'

export class ObtenerEstadosMapeador {
  public static persitenciaEntidades(datos: EstadoPersistenciaDTO[]): Estado[] {
    return datos.map((estado) =>
      Estado.crear({
        identificador: Identificador.crear(estado.idEstado),
        nombre: NombreEstado.crear(estado.nombreEstado),
      }),
    )
  }

  public static entidadesRespuesta(
    estados: Estado[],
    idPais: string,
  ): ObtenerEstadosRespuestaDTO[] {
    return estados.map((estado) => {
      return {
        idEstado: estado.obtenerIdentificador().obtenerId(),
        idPais,
        nombreEstado: estado.obtenerNombre().obtenerNombre(),
      }
    })
  }
}
