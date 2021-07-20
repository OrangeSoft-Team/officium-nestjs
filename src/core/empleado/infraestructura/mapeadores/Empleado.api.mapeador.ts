import { MapeadorFecha } from '../../../../comun/infraestructura/mapeadores/Fecha.mapeador'
import { IniciarSesionEmpleadoQueryDTO } from '../../aplicacion/dto/IniciarSesionEmpleado.query'
import { RegistrarEmpleadoComandoDTO } from '../../aplicacion/dto/RegistrarEmpleado.comando'
import { ComandoRegistrarEmpleado } from '../cqrs/comandos/RegistrarEmpleado.comando'
import { QueryIniciarSesionEmpleado } from '../cqrs/queries/IniciarSesionEmpleado.query'

export abstract class EmpleadoApiMapeador {
  public static transformarComandoRegistrarEmpleado(
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

  public static transformarQueryIniciarSesionEmpleado(
    query: QueryIniciarSesionEmpleado,
  ): IniciarSesionEmpleadoQueryDTO {
    const datos = query.datos
    return {
      token: datos.token,
      correoElectronico: datos.correoElectronico,
    }
  }
}
