import { Direccion } from '../../dominio/entidades/Direccion'
import { CrearDireccionPersistenciaDTO } from '../puertos/IRepositorioDirecciones'

export abstract class DireccionMapeador {
  public static transformarEntidadEnPersistencia(
    direccion: Direccion,
  ): CrearDireccionPersistenciaDTO {
    return {
      id: direccion.obtenerIdentificador().obtenerId(),
      calleUno: direccion.obtenerCalleUno().obtenerCalle(),
      calleDos: direccion.obtenerCalleDos().obtenerCalle(),
      codigoPostal: direccion.obtenerCodigoPostal().obtenerCodigo(),
      idCiudad: direccion.obtenerIdentificadorCiudad().obtenerId(),
    }
  }
}
