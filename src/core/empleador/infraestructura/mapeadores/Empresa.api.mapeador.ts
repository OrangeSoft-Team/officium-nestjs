import { EditarPerfilEmpresaComandoDTO } from '../../aplicacion/dto/comandos/EditarPerfilEmpresa.comando'
import {
  IniciarSesionEmpresaQueryDTO,
  IniciarSesionEmpresaRespuestaDTO,
} from '../../aplicacion/dto/queries/IniciarSesionEmpresa.query'
import {
  ObtenerPerfilEmpresaQueryDTO,
  ObtenerPerfilEmpresaRespuestaDTO,
} from '../../aplicacion/dto/queries/ObtenerPerfilEmpresa.query'
import { ComandoActualizarPerfilEmpresa } from '../cqrs/comandos/ActualizarPerfilEmpresa.comando'
import { QueryIniciarSesionEmpresa } from '../cqrs/queries/IniciarSesionEmpresa.query'
import { QueryObtenerPerfilEmpresa } from '../cqrs/queries/ObtenerPerfilEmpresa.query'
import { DatosBasicosEmpleadorApiDTO } from '../dto/DatosBasicosEmpleador.api.dto'
import { DatosSesionAutenticadaEmpresaApiDTO } from '../dto/DatosInicioSesionEmpleador.api.dto'
import { HabilidadApiMapeador } from './Habilidad.api.mapeador'

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

  public static convertirComandoEditarPerfilEmpresa(
    comando: ComandoActualizarPerfilEmpresa,
  ): EditarPerfilEmpresaComandoDTO {
    const datos = comando.datos
    return {
      idEmpresa: datos.idUsuario,
      nombre: datos.nombreEmpresa,
      requisitosEspeciales: datos.requisitosEspeciales,
      calleUno: datos.calleUno,
      calleDos: datos.calleDos,
      codigoPostal: datos.codigoPostal,
      idCiudad: datos.uuidCiudad,
      idEstado: datos.uuidEstado,
      idPais: datos.uuidPais,
      idHabilidades: datos.uuidHabilidades,
    }
  }

  public static convertirQueryObtenerPerfilEmpresa(
    query: QueryObtenerPerfilEmpresa,
  ): ObtenerPerfilEmpresaQueryDTO {
    const datos = query.datos

    return {
      idEmpresa: datos.idUsuario,
    }
  }

  public static convertirRespuestaObtenerPerfilEmpresa(
    respuesta: ObtenerPerfilEmpresaRespuestaDTO,
  ): DatosBasicosEmpleadorApiDTO {
    return {
      correoElectronico: respuesta.correo,
      nombreEmpresa: respuesta.nombre,
      requisitosEspeciales: respuesta.requisitosEspeciales,
      calleUno: respuesta.calleUno,
      calleDos: respuesta.calleDos,
      codigoPostal: respuesta.codigoPostal,
      uuidCiudad: respuesta.idCiudad,
      uuidEstado: respuesta.idEstado,
      uuidPais: respuesta.idPais,
      habilidades:
        HabilidadApiMapeador.convertirRespuestaObtenerHabilidadesEmpresa(
          respuesta.habilidades,
        ),
    }
  }
}
