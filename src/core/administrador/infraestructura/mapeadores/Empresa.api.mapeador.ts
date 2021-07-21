import {
  IniciarSesionAdministradorQueryDTO,
  IniciarSesionAdministradorRespuestaDTO,
} from '../../aplicacion/dto/IniciarSesionAdministrador.query'
import { QueryIniciarSesionAdministrador } from '../cqrs/queries/IniciarSesionAdministrador.query'
import { DatosSesionAutenticadaAdministradorApiDTO } from '../dto/DatosInicioSesionAdministrador.api.dto'

export abstract class AdministradorApiMapeador {
  public static convertirQueryIniciarSesionAdministrador(
    query: QueryIniciarSesionAdministrador,
  ): IniciarSesionAdministradorQueryDTO {
    const datos = query.datos
    return {
      token: datos.token,
      correoElectronico: datos.correoElectronico,
    }
  }

  public static convertirRespuestaIniciarSesionAdministrador(
    respuesta: IniciarSesionAdministradorRespuestaDTO,
  ): DatosSesionAutenticadaAdministradorApiDTO {
    return {
      primerNombre: respuesta.primerNombre,
      primerApellido: respuesta.primerApellido,
    }
  }
}
