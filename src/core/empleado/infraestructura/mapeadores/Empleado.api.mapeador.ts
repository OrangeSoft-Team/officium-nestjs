import { MapeadorFecha } from '../../../../comun/infraestructura/mapeadores/Fecha.mapeador'
import {
  IniciarSesionEmpleadoQueryDTO,
  IniciarSesionEmpleadoRespuestaDTO,
} from '../../aplicacion/dto/queries/IniciarSesionEmpleado.query'
import { RegistrarEmpleadoComandoDTO } from '../../aplicacion/dto/comandos/RegistrarEmpleado.comando'
import { ComandoRegistrarEmpleado } from '../cqrs/comandos/RegistrarEmpleado.comando'
import { QueryIniciarSesionEmpleado } from '../cqrs/queries/IniciarSesionEmpleado.query'
import { DatosSesionAutenticadaEmpleadoApiDTO } from '../dto/DatosInicioSesionEmpleado.api.dto'
import {
  VerPerfilEmpleadoQueryDTO,
  VerPerfilEmpleadoRespuestaDTO,
} from '../../aplicacion/dto/queries/VerPerfilEmpleado.query'
import { QueryVerPerfilEmpleadoActual } from '../cqrs/queries/VerPerfilEmpleado.query'
import { VerPerfilEmpleadoApiDTO } from '../dto/VerPerfilEmpleado.api.dto'

export abstract class EmpleadoApiMapeador {
  public static convertirComandoRegistrarEmpleado(
    comando: ComandoRegistrarEmpleado,
  ): RegistrarEmpleadoComandoDTO {
    const datos = comando.datos
    return {
      correoElectronico: datos.correoElectronico,
      fechaNacimiento: MapeadorFecha.transformar(datos.fechaNacimiento),
      genero: datos.genero,
      nivelEducativo: datos.nivelEducativo,
      primerApellido: datos.primerApellido,
      primerNombre: datos.primerNombre,
      telefono: datos.numeroTelefonico,
      token: datos.token,
      segundoNombre: datos.segundoNombre,
      segundoApellido: datos.segundoApellido,
      direccion: {
        calleUno: datos.calleUno,
        calleDos: datos.calleDos,
        codigoPostal: datos.codigoPostal,
        idCiudad: datos.uuidCiudad,
        idEstado: datos.uuidEstado,
        idPais: datos.uuidPais,
      },
    }
  }

  public static convertirQueryVerPerfilEmpleado(
    query: QueryVerPerfilEmpleadoActual,
  ): VerPerfilEmpleadoQueryDTO {
    const datos = query.datos

    return {
      id: datos.idEmpleado,
    }
  }

  public static convertirRespuestaVerPerfilEmpleado(
    respuesta: VerPerfilEmpleadoRespuestaDTO,
  ): VerPerfilEmpleadoApiDTO {
    return {
      correoElectronico: respuesta.correo,
      fechaNacimiento: MapeadorFecha.formatear(respuesta.fechaNacimiento),
      genero: respuesta.genero,
      nivelEducativo: respuesta.nivelEducativo,
      numeroTelefonico: respuesta.numeroTelefonico,
      primerNombre: respuesta.primerNombre,
      primerApellido: respuesta.primerApellido,
      segundoNombre: respuesta.segundoNombre,
      segundoApellido: respuesta.segundoApellido,
      calleUno: respuesta.calleUno,
      calleDos: respuesta.calleDos,
      codigoPostal: respuesta.codigoPostal,
      uuidCiudad: respuesta.idCiudad,
      uuidEstado: respuesta.idEstado,
      uuidPais: respuesta.idPais,
    }
  }

  public static convertirQueryIniciarSesionEmpleado(
    query: QueryIniciarSesionEmpleado,
  ): IniciarSesionEmpleadoQueryDTO {
    const datos = query.datos
    return {
      token: datos.token,
      correoElectronico: datos.correoElectronico,
    }
  }

  public static convertirRespuestaIniciarSesionEmpleado(
    respuesta: IniciarSesionEmpleadoRespuestaDTO,
  ): DatosSesionAutenticadaEmpleadoApiDTO {
    return {
      primerNombre: respuesta.primerNombre,
      primerApellido: respuesta.primerApellido,
    }
  }
}
