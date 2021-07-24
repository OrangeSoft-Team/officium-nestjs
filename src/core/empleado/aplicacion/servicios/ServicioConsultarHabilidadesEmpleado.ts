import { IExcepcionAplicacion } from '../../../../comun/aplicacion/IExcepcionAplicacion'
import { IServicioAplicacion } from '../../../../comun/aplicacion/IServicioAplicacion'
import { Resultado } from '../../../../comun/aplicacion/Resultado'
import { EmpleadoNoExiste } from '../../dominio/excepciones/empleado/Empleado.excepciones'
import { RestaurarEmpleado } from '../../dominio/servicios/RestaurarEmpleado'
import {
  ConsultarHabilidadesEmpleadoQueryDTO,
  ConsultarHabilidadesEmpleadoRespuestaDTO,
} from '../dto/queries/ConsultarHabilidadesEmpleado.query'
import { EmpleadoMapeador } from '../mapeadores/Empleado.mapeador'
import { HabilidadMapeador } from '../mapeadores/Habilidad.mapeador'
import { IRepositorioEmpleados } from '../puertos/IRepositorioEmpleados'
import { IRepositorioHabilidades } from '../puertos/IRepositorioHabilidades'

export class ServicioConsultarHabilidadesEmpleado
  implements IServicioAplicacion
{
  public constructor(
    private readonly repositorioEmpleados: IRepositorioEmpleados,
    private readonly repositorioHabilidades: IRepositorioHabilidades,
  ) {}

  public async ejecutar(
    query: ConsultarHabilidadesEmpleadoQueryDTO,
  ): Promise<Resultado<any>> {
    try {
      // Obtenemos los datos del empleado de persistencia
      const datosEmpleado = await this.repositorioEmpleados.obtener(
        query.idEmpleado,
      )
      if (!datosEmpleado)
        throw new EmpleadoNoExiste('El empleado no se encuentra registrado.')

      // Obtenemos las habilidades del empleado de persistencia
      const datosHabilidades =
        await this.repositorioHabilidades.obtenerPorIdEmpleado(query.idEmpleado)

      // Mappeamos a dominio
      const datosRestaurarEmpleado =
        EmpleadoMapeador.convertirPersistenciaEnDominio(datosEmpleado)

      datosRestaurarEmpleado.identificadoresHabilidades =
        HabilidadMapeador.convertirPersistenciaEnDominio(datosHabilidades)

      // Obtenemos el empleado
      const empleado = RestaurarEmpleado.restaurar(datosRestaurarEmpleado)

      // Obtenemos las habilidades del empleado
      const habilidades = empleado.obtenerIdentificadoresHabilidades()

      // Mapeamos las habilidades a respuesta
      const respuesta =
        HabilidadMapeador.convertirDominioEnRespuesta(habilidades)

      return Resultado.ok<ConsultarHabilidadesEmpleadoRespuestaDTO[]>(respuesta)
    } catch (error) {
      return Resultado.falla<IExcepcionAplicacion>(error)
    }
  }
}
