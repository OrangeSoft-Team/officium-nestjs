import { MapeadorFecha } from '../../../../comun/infraestructura/mapeadores/Fecha.mapeador'
import { RegistrarEmpleadoComandoDTO } from '../../aplicacion/dto/RegistrarEmpleado.comando'
import { ComandoRegistrarEmpleado } from '../cqrs/comandos/RegistrarEmpleado.comando'

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
}
