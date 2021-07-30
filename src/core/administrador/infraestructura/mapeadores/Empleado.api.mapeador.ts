import { MapeadorFecha } from '../../../../comun/infraestructura/mapeadores/Fecha.mapeador'
import { ListarEmpleadosRespuestaDTO } from '../../aplicacion/dto/queries/ListarEmpleados.query'
import {
  VerPerfilEmpleadoQueryDTO,
  VerPerfilEmpleadoRespuestaDTO,
} from '../../aplicacion/dto/queries/VerPerfilEmpleado.query'
import { QueryVerPerfilEmpleado } from '../cqrs/queries/VerPerfilEmpleado.query'
import { DetalleEmpleadoApiDTO } from '../dto/DetalleEmpleado.api.dto'
import { ListaEmpleadosApiDTO } from '../dto/ListaEmpleados.api.dto'
import { DireccionApiMapeador } from './Direccion.api.mapeador'
import { ExperienciaLaboralApiMapeador } from './ExperienciaLaboral.api.mapeador'
import { HabilidadApiMapeador } from './Habilidad.api.mapeador'

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

  public static convertirQueryVerPerfilEmpleado(
    query: QueryVerPerfilEmpleado,
  ): VerPerfilEmpleadoQueryDTO {
    return {
      idEmpleado: query.datos.idEmpleado,
    }
  }

  public static convertirRespuestaVerPerfilEmpleado(
    respuesta: VerPerfilEmpleadoRespuestaDTO,
  ): DetalleEmpleadoApiDTO {
    const habilidades = respuesta.habilidades?.map((habilidad) =>
      HabilidadApiMapeador.convertirRespuestaHabilidadEmpleado(habilidad),
    )
    const experienciasLaborales = respuesta.experienciasLaborales?.map(
      (experiencia) =>
        ExperienciaLaboralApiMapeador.convertirRespuestaExperienciaLaboralEmpleado(
          experiencia,
        ),
    )

    return {
      uuid: respuesta.id,
      correo: respuesta.correoElectronico,
      estatus: respuesta.estatus,
      genero: respuesta.genero,
      fechaNacimiento: MapeadorFecha.formatear(respuesta.fechaNacimiento),
      primerNombre: respuesta.primerNombre,
      primerApellido: respuesta.primerApellido,
      segundoNombre: respuesta.segundoNombre,
      segundoApellido: respuesta.segundoApellido,
      ...DireccionApiMapeador.convertirRespuestaVerDireccionEmpresa(respuesta),
      habilidades,
      experienciasLaborales,
    }
  }
}
