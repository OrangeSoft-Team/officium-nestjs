import { ListarEmpleadosRespuestaDTO } from '../../aplicacion/dto/queries/ListarEmpleados.query'
import { ListaEmpleadosApiDTO } from '../dto/ListaEmpleados.api.dto'

export abstract class EmpleadoApiMapeador {
  public static convertirRespuestaListarEmpleados(
    respuesta: ListarEmpleadosRespuestaDTO[],
  ): ListaEmpleadosApiDTO[] {
    return respuesta.map((empleado) => {
      return {
        uuid: empleado.id,
        correo: empleado.correoElectronico,
        estatus: empleado.estatus,
        genero: empleado.genero,
        primerNombre: empleado.primerNombre,
        primerApellido: empleado.primerApellido,
        segundoNombre: empleado.segundoNombre,
        segundoApellido: empleado.segundoApellido,
      }
    })
  }
}
