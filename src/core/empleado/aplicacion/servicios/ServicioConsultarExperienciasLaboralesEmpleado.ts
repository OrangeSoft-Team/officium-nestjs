import { IExcepcionAplicacion } from '../../../../comun/aplicacion/IExcepcionAplicacion'
import { IServicioAplicacion } from '../../../../comun/aplicacion/IServicioAplicacion'
import { Resultado } from '../../../../comun/aplicacion/Resultado'
import { EmpleadoNoExiste } from '../../dominio/excepciones/empleado/Empleado.excepciones'
import { ConsultarExperienciasLaboralesEmpleado } from '../../dominio/servicios/ConsultarExperienciasLaboralesEmpleado'
import {
  DatosRestaurarEmpleado,
  RestaurarEmpleado,
} from '../../dominio/servicios/RestaurarEmpleado'
import {
  ConsultarExperienciasLaboralesEmpleadoQueryDTO,
  ConsultarExperienciasLaboralesEmpleadoRespuestaDTO,
} from '../dto/queries/ConsultarExperienciasLaboralesEmpleado.query'
import { EmpleadoMapeador } from '../mapeadores/Empleado.mapeador'
import { ExperienciaLaboralMapeador } from '../mapeadores/ExperienciaLaboral.mapeador'
import { IRepositorioEmpleados } from '../puertos/IRepositorioEmpleados'
import { IRepositorioExperienciasLaborales } from '../puertos/IRepositorioExperienciasLaborales'

export class ServicioConsultarExperienciasLaboralesEmpleado
  implements IServicioAplicacion
{
  public constructor(
    private readonly repositorioExperienciasLaborales: IRepositorioExperienciasLaborales,
    private readonly repositorioEmpleados: IRepositorioEmpleados,
  ) {}

  public async ejecutar(
    query: ConsultarExperienciasLaboralesEmpleadoQueryDTO,
  ): Promise<Resultado<any>> {
    try {
      // Obtenemos los datos del empleado de persistencia
      const datosEmpleado = await this.repositorioEmpleados.obtener(
        query.idEmpleado,
      )
      if (!datosEmpleado)
        throw new EmpleadoNoExiste('El empleado no se encuentra registrado.')

      // Obtenemos los datos de las experiencias laborales actuales
      const datosExperiencias =
        await this.repositorioExperienciasLaborales.obtenerPorIdEmpleado(
          query.idEmpleado,
        )

      // Mappeamos a dominio
      const datosRestaurar: DatosRestaurarEmpleado = {
        ...EmpleadoMapeador.convertirPersistenciaEnDominio(datosEmpleado),
        direccion: null,
        experienciasLaborales:
          ExperienciaLaboralMapeador.convertirPersistenciaEnDominio(
            datosExperiencias,
          ),
      }

      // Obtenemos el empleado
      const empleado = RestaurarEmpleado.restaurar(datosRestaurar)

      // Agregamos la experiencia laboral al empleado
      const experiencias =
        ConsultarExperienciasLaboralesEmpleado.consultar(empleado)

      // Mapeamos a respuesta las experiencias
      const respuesta =
        ExperienciaLaboralMapeador.convertirDominioEnRespuesta(experiencias)

      // Retornamos ok
      return Resultado.ok<ConsultarExperienciasLaboralesEmpleadoRespuestaDTO[]>(
        respuesta,
      )
    } catch (error) {
      return Resultado.falla<IExcepcionAplicacion>(error)
    }
  }
}
