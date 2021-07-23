import { IdentificadorHabilidad } from '../../dominio/values/habilidad/IdentificadorHabilidad'
import { ActualizarHabilidadesEmpleadoComandoDTO } from '../dto/comandos/ActualizarHabilidadesEmpleado.comando'
import { ConsultarHabilidadesEmpleadoRespuestaDTO } from '../dto/queries/ConsultarHabilidadesEmpleado.query'

export abstract class HabilidadMapeador {
  public static convertirPersistenciaEnDominio(
    datos: string[],
  ): IdentificadorHabilidad[] {
    return datos.map((id) => IdentificadorHabilidad.crear(id))
  }

  public static convertirDominioEnRespuesta(
    identificadoresHabilidades: IdentificadorHabilidad[],
  ): ConsultarHabilidadesEmpleadoRespuestaDTO[] {
    return identificadoresHabilidades.map((id) => {
      return { idHabilidad: id.obtenerId() }
    })
  }

  public static convertirComandoEnDatosActualizar(
    comando: ActualizarHabilidadesEmpleadoComandoDTO,
  ): IdentificadorHabilidad[] {
    return comando.idHabilidades.map((id) => IdentificadorHabilidad.crear(id))
  }

  public static convertirDominioEnPersistencia(
    identificadores: IdentificadorHabilidad[],
  ): string[] {
    return identificadores.map((id) => id.obtenerId())
  }
}
