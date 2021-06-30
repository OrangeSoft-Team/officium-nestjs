import { Pais } from '../../dominio/Pais'
import { Identificador } from '../../dominio/values/Identificador'
import { NombrePais } from '../../dominio/values/NombrePais'
import { ObtenerPaisesRespuestaDTO } from '../dto/ObtenerPaises.dto'
import { PaisPersistenciaDTO } from '../puertos/IRepositorioPaises'

export class PaisMapeador {
  public static transformarPersistenciaEnEntidades(
    datos: PaisPersistenciaDTO[],
  ): Pais[] {
    return datos.map((pais) =>
      Pais.crear({
        identificador: Identificador.crear(pais.id),
        nombre: NombrePais.crear(pais.nombre),
      }),
    )
  }

  public static transformarEntidadesEnRespuesta(
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
