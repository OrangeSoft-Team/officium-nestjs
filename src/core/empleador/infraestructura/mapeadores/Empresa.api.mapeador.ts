import {
  IniciarSesionEmpresaQueryDTO,
  IniciarSesionEmpresaRespuestaDTO,
} from '../../aplicacion/dto/IniciarSesionEmpresa.query'
import { QueryIniciarSesionEmpresa } from '../cqrs/queries/IniciarSesionEmpresa.query'
import { DatosSesionAutenticadaEmpresaApiDTO } from '../dto/DatosInicioSesionEmpleador.api.dto'

export abstract class EmpresaApiMapeador {
  public static convertirQueryIniciarSesionEmpresa(
    query: QueryIniciarSesionEmpresa,
  ): IniciarSesionEmpresaQueryDTO {
    const datos = query.datos
    return {
      token: datos.token,
      correoElectronico: datos.correoElectronico,
    }
  }

  public static convertirRespuestaIniciarSesionEmpresa(
    respuesta: IniciarSesionEmpresaRespuestaDTO,
  ): DatosSesionAutenticadaEmpresaApiDTO {
    return {
      nombreEmpresa: respuesta.nombreEmpresa,
    }
  }
}
