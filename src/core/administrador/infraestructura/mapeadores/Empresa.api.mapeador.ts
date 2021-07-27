import { CrearEmpresaComandoDTO } from '../../aplicacion/dto/comandos/CrearEmpresa.comando'
import { EditarEmpresaComandoDTO } from '../../aplicacion/dto/comandos/EditarEmpresa.comando'
import {
  VerDetalleEmpresaQueryDTO,
  VerDetalleEmpresaRespuestaDTO,
} from '../../aplicacion/dto/queries/VerDetalleEmpresa.query'
import { VerListaEmpresasRespuestaDTO } from '../../aplicacion/dto/queries/VerListaEmpresas.query'
import { ComandoCrearEmpresa } from '../cqrs/comandos/CrearEmpresa.comando'
import { ComandoEditarEmpresa } from '../cqrs/comandos/EditarEmpresa.comando'
import { QueryVerDetalleEmpresa } from '../cqrs/queries/VerDetalleEmpresa.query'
import { DetalleEmpresaApiDTO } from '../dto/DetalleEmpresa.api.dto'
import { ListaEmpresasApiDTO } from '../dto/ListaEmpresa.api.dto'

export abstract class EmpresaApiMapeador {
  public static convertirRespuestaVerListaEmpresas(
    respuesta: VerListaEmpresasRespuestaDTO[],
  ): ListaEmpresasApiDTO[] {
    return respuesta.map((empresa) => {
      return {
        uuid: empresa.id,
        correo: empresa.correoElectronico,
        estatus: empresa.estatus,
        nombre: empresa.nombre,
      }
    })
  }

  public static convertirQueryVerDetalleEmpresa(
    query: QueryVerDetalleEmpresa,
  ): VerDetalleEmpresaQueryDTO {
    const datos = query.datos
    return {
      id: datos.idEmpresa,
    }
  }

  public static convertirRespuestaVerDetalleEmpresa(
    respuesta: VerDetalleEmpresaRespuestaDTO,
  ): DetalleEmpresaApiDTO {
    return {
      uuid: respuesta.id,
      correo: respuesta.correoElectronico,
      estatus: respuesta.estatus,
      nombre: respuesta.nombre,
      requisitosEspeciales: respuesta.requisitosEspeciales,
    }
  }

  public static convertirComandoCrearEmpresa(
    comando: ComandoCrearEmpresa,
  ): CrearEmpresaComandoDTO {
    const datos = comando.datos
    return {
      nombre: datos.nombre,
      correoElectronico: datos.correo,
      requisitosEspeciales: datos.requisitosEspeciales,
      token: datos.token,
    }
  }

  public static convertirComandoEditarEmpresa(
    comando: ComandoEditarEmpresa,
  ): EditarEmpresaComandoDTO {
    const datos = comando.datos
    return {
      id: datos.idEmpresa,
      estatus: datos.estatus,
      nombre: datos.nombre,
      requisitosEspeciales: datos.requisitosEspeciales,
    }
  }
}
