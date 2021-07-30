import { VerPerfilEmpleadoRespuestaDTO } from '../../aplicacion/dto/queries/VerPerfilEmpleado.query'

export abstract class DireccionApiMapeador {
  public static convertirRespuestaVerDireccionEmpresa(
    respuesta: VerPerfilEmpleadoRespuestaDTO,
  ) {
    return {
      calleUno: respuesta.calleUno,
      calleDos: respuesta.calleDos,
      codigoPostal: respuesta.codigoPostal,
      nombrePais: respuesta.nombrePais,
      nombreEstado: respuesta.nombreEstado,
      nombreCiudad: respuesta.nombreCiudad,
    }
  }
}
