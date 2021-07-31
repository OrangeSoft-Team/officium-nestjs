import {
  ObtenerCiudadesQueryDTO,
  ObtenerCiudadesRespuestaDTO,
} from '../../aplicacion/dto/queries/ObtenerCiudades.query'
import {
  ObtenerEstadosQueryDTO,
  ObtenerEstadosRespuestaDTO,
} from '../../aplicacion/dto/queries/ObtenerEstados.query'
import { ObtenerPaisesRespuestaDTO } from '../../aplicacion/dto/queries/ObtenerPaises.query'
import { QueryObtenerCiudades } from '../cqrs/queries/ObtenerCiudades.query'
import { QueryObtenerEstados } from '../cqrs/queries/ObtenerEstados.query'
import { CiudadesApiDTO } from '../dto/Ciudades.api.dto'
import { EstadosApiDTO } from '../dto/Estados.api.dto'
import { PaisesApiDTO } from '../dto/Paises.api.dto'

export abstract class UbicacionApiMapeador {
  public static convertirRespuestaObtenerPaises(
    respuesta: ObtenerPaisesRespuestaDTO[],
  ): PaisesApiDTO[] {
    return respuesta.map((pais) => {
      return {
        uuidPais: pais.id,
        nombrePais: pais.nombre,
      }
    })
  }

  public static convertirQueryObtenerEstados(
    query: QueryObtenerEstados,
  ): ObtenerEstadosQueryDTO {
    return { idPais: query.datos.idPais }
  }

  public static convertirRespuestaObtenerEstados(
    respuesta: ObtenerEstadosRespuestaDTO[],
  ): EstadosApiDTO[] {
    return respuesta?.map((estado) => {
      return {
        uuidEstado: estado.id,
        uuidPais: estado.idPais,
        nombreEstado: estado.nombre,
      }
    })
  }

  public static convertirQueryObtenerCiudades(
    query: QueryObtenerCiudades,
  ): ObtenerCiudadesQueryDTO {
    return {
      idEstado: query.datos.idEstado,
      idPais: query.datos.idPais,
    }
  }

  public static convertirRespuestaObtenerCiudades(
    respuesta: ObtenerCiudadesRespuestaDTO[],
  ): CiudadesApiDTO[] {
    return respuesta?.map((ciudad) => {
      return {
        uuidPais: ciudad.idPais,
        uuidEstado: ciudad.idEstado,
        uuidCiudad: ciudad.id,
        nombreCiudad: ciudad.nombre,
      }
    })
  }
}
