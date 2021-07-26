import { EditarPerfilAdministradorComandoDTO } from '../../aplicacion/dto/comandos/EditarPerfilAdministrador.comando'
import {
  IniciarSesionAdministradorQueryDTO,
  IniciarSesionAdministradorRespuestaDTO,
} from '../../aplicacion/dto/queries/IniciarSesionAdministrador.query'
import {
  ObtenerPerfilAdministradorQueryDTO,
  ObtenerPerfilAdministradorRespuestaDTO,
} from '../../aplicacion/dto/queries/ObtenerPerfilAdministrador.query'
import { ComandoEditarPerfilAdministrador } from '../cqrs/comandos/EditarPerfilAdministrador.comando'
import { QueryIniciarSesionAdministrador } from '../cqrs/queries/IniciarSesionAdministrador.query'
import { QueryObtenerPerfilAdministrador } from '../cqrs/queries/ObtenerPerfilAdministrador.query'
import { DatosBasicosAdministradorApiDTO } from '../dto/DatosBasicosAdministrador.api.dto'
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

  public static convertirQueryObtenerPerfilAdministrador(
    query: QueryObtenerPerfilAdministrador,
  ): ObtenerPerfilAdministradorQueryDTO {
    const datos = query.datos
    return {
      idAdministrador: datos.idUsuario,
    }
  }

  public static convertirRespuestaObtenerPerfilAdministrador(
    respuesta: ObtenerPerfilAdministradorRespuestaDTO,
  ): DatosBasicosAdministradorApiDTO {
    return {
      primerNombre: respuesta.primerNombre,
      primerApellido: respuesta.primerApellido,
      correoElectronico: respuesta.correoElectronico,
      cargo: respuesta.cargo,
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

  public static convertirComandoEditarPerfilAdministrador(
    comando: ComandoEditarPerfilAdministrador,
  ): EditarPerfilAdministradorComandoDTO {
    const datos = comando.datos
    return {
      idAdministrador: datos.idUsuario,
      cargo: datos.cargo,
      primerApellido: datos.primerApellido,
      primerNombre: datos.primerNombre,
    }
  }
}
