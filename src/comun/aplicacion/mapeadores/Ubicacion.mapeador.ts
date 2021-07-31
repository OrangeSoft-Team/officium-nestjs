import { Pais } from '../../dominio/entidades/Pais'
import { IdentificadorPais } from '../../dominio/values/pais/IdentificadorPais'
import { NombrePais } from '../../dominio/values/pais/NombrePais'
import { ObtenerPaisesRespuestaDTO } from '../dto/queries/ObtenerPaises.query'
import { PaisPersistenciaDTO } from '../puertos/IRepositorioUbicaciones'

export abstract class UbicacionMapeador {
  public static convertirPaisPersistenciaEnDominio(
    datos: PaisPersistenciaDTO,
  ): Pais {
    return Pais.restaurar({
      identificador: IdentificadorPais.crear(datos.id),
      nombre: NombrePais.crear(datos.nombre),
    })
  }

  public static convertirPaisDominioEnRespuesta(
    pais: Pais,
  ): ObtenerPaisesRespuestaDTO {
    return {
      id: pais.obtenerIdentificador(),
      nombre: pais.obtenerNombre(),
    }
  }
}
