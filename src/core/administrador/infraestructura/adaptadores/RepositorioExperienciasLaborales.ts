import { getRepository } from 'typeorm'
import {
  ExperienciaLaboralPersistenciaDTO,
  IRepositorioExperienciasLaborales,
} from '../../aplicacion/puertos/IRepositorioExperienciasLaborales'
import { EmpleadoORM } from '../persistencia/Empleado.orm'
import { ExperienciaLaboralORM } from '../persistencia/ExperienciaLaboral.orm'

export class RepositorioExperienciasLaborales
  implements IRepositorioExperienciasLaborales
{
  public async obtenerPorIdEmpleado(
    id: string,
  ): Promise<ExperienciaLaboralPersistenciaDTO[]> {
    try {
      const empleadoORM = getRepository(EmpleadoORM)
      const experienciaLaboralORM = getRepository(ExperienciaLaboralORM)

      const empleado = await empleadoORM.findOneOrFail({ where: { uuid: id } })

      const experienciasLaborales = await experienciaLaboralORM.find({
        where: { empleado },
      })

      return experienciasLaborales.map((experiencia) => {
        return {
          id: experiencia.uuid,
          cargo: experiencia.cargo,
          fechaInicio: experiencia.fecha_inicio,
          fechaFin: experiencia.fecha_fin,
          nombreEmpresa: experiencia.nombre_empresa,
        }
      })
    } catch {}
  }
}
