import { Pais } from '../../dominio/Pais'
import { Identificador } from '../../dominio/values/Identificador'
import { NombrePais } from '../../dominio/values/NombrePais'
import { ObtenerPaisesRespuestaDTO } from '../dto/ObtenerPaises.dto'
import { PaisPersistenciaDTO } from '../puertos/IRepositorioPaises'

export class ObtenerPaisesMapeador {
  public static persitenciaEntidades(datos: PaisPersistenciaDTO[]): Pais[] {
    return datos.map((pais) =>
      Pais.crear({
        identificador: Identificador.crear(pais.id),
        nombre: NombrePais.crear(pais.nombre),
      }),
    )
  }

  public static entidadesRespuesta(
    paises: Pais[],
  ): ObtenerPaisesRespuestaDTO[] {
    return paises.map((pais) => {
      return {
        id: pais.obtenerIdentificador().obtenerId(),
        nombre: pais.obtenerNombre().obtenerNombre(),
      }
    })
  }
}
