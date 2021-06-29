import { Ciudad } from '../../dominio/Ciudad'
import { Identificador } from '../../dominio/values/Identificador'
import { NombreCiudad } from '../../dominio/values/NombreCiudad'
import { ObtenerCiudadesRespuestaDTO } from '../dto/ObtenerCiudades.dto'
import { CiudadPersistenciaDTO } from '../puertos/IRepositorioCiudades'

export class ObtenerCiudadesMapeador {
  public static persitenciaEntidades(datos: CiudadPersistenciaDTO[]): Ciudad[] {
    return datos.map((ciudad) =>
      Ciudad.crear({
        identificador: Identificador.crear(ciudad.idCiudad),
        nombre: NombreCiudad.crear(ciudad.nombreCiudad),
      }),
    )
  }

  public static entidadesRespuesta(
    ciudades: Ciudad[],
    idPais: string,
    idEstado: string,
  ): ObtenerCiudadesRespuestaDTO[] {
    return ciudades.map((ciudad) => {
      return {
        idCiudad: ciudad.obtenerIdentificador().obtenerId(),
        nombreCiudad: ciudad.obtenerNombre().obtenerNombre(),
        idPais,
        idEstado,
      }
    })
  }
}
