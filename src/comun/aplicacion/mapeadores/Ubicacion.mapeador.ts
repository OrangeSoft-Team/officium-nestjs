import { Ciudad } from '../../dominio/entidades/Ciudad'
import { Estado } from '../../dominio/entidades/Estado'
import { Pais } from '../../dominio/entidades/Pais'
import { IdentificadorCiudad } from '../../dominio/values/ciudad/IdentificadorCiudad'
import { NombreCiudad } from '../../dominio/values/ciudad/NombreCiudad'
import { IdentificadorEstado } from '../../dominio/values/estado/IdentificadorEstado'
import { NombreEstado } from '../../dominio/values/estado/NombreEstado'
import { IdentificadorPais } from '../../dominio/values/pais/IdentificadorPais'
import { NombrePais } from '../../dominio/values/pais/NombrePais'
import { ObtenerCiudadesRespuestaDTO } from '../dto/queries/ObtenerCiudades.query'
import { ObtenerEstadosRespuestaDTO } from '../dto/queries/ObtenerEstados.query'
import { ObtenerPaisesRespuestaDTO } from '../dto/queries/ObtenerPaises.query'
import {
  PaisPersistenciaDTO,
  EstadoPersistenciaDTO,
  CiudadPersistenciaDTO,
} from '../puertos/IRepositorioUbicaciones'

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

  public static convertirEstadoPersistenciaEnDominio(
    datos: EstadoPersistenciaDTO,
  ): Estado {
    return Estado.restaurar({
      identificador: IdentificadorEstado.crear(datos.id),
      nombre: NombreEstado.crear(datos.nombre),
    })
  }

  public static convertirEstadoDominioEnRespuesta(
    estado: Estado,
  ): ObtenerEstadosRespuestaDTO {
    return {
      id: estado.obtenerIdentificador(),
      nombre: estado.obtenerNombre(),
      idPais: null,
    }
  }

  public static convertirCiudadPersistenciaEnDominio(
    datos: CiudadPersistenciaDTO,
  ): Ciudad {
    return Ciudad.restaurar({
      identificador: IdentificadorCiudad.crear(datos.id),
      nombre: NombreCiudad.crear(datos.nombre),
    })
  }

  public static convertirCiudadDominioEnRespuesta(
    ciudad: Ciudad,
  ): ObtenerCiudadesRespuestaDTO {
    return {
      id: ciudad.obtenerIdentificador(),
      nombre: ciudad.obtenerNombre(),
      idPais: null,
      idEstado: null,
    }
  }
}
