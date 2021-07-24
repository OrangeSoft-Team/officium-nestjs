import { getRepository } from 'typeorm'
import {
  ExperienciaLaboralPersitenciaDTO,
  IRepositorioExperienciasLaborales,
} from '../../aplicacion/puertos/IRepositorioExperienciasLaborales'
import { EmpleadoORM } from '../persistencia/Empleado.orm'
import { ExperienciaLaboralORM } from '../persistencia/ExperienciaLaboral.orm'

export class RepositorioExperienciasLaborales
  implements IRepositorioExperienciasLaborales
{
  public async eliminar(
    idExperiencia: string,
    idEmpleado: string,
  ): Promise<void> {
    try {
      const empleadoORM = getRepository(EmpleadoORM)
      const experienciaORM = getRepository(ExperienciaLaboralORM)

      const empleado = await empleadoORM.findOneOrFail({
        where: { uuid: idEmpleado },
      })

      const experiencia = await experienciaORM.findOneOrFail({
        where: { uuid: idExperiencia, empleado },
      })

      await experienciaORM.remove(experiencia)
    } catch {}
  }

  public async editar(datos: ExperienciaLaboralPersitenciaDTO): Promise<void> {
    try {
      const empleadoORM = getRepository(EmpleadoORM)
      const experienciaORM = getRepository(ExperienciaLaboralORM)

      const empleado = await empleadoORM.findOneOrFail({
        where: { uuid: datos.idEmpleado },
      })

      const experiencia = experienciaORM.create({
        uuid: datos.id,
        cargo: datos.cargo,
        nombre_empresa: datos.nombreEmpresa,
        fecha_inicio: datos.fechaInicio,
        fecha_fin: datos.fechaFin,
        empleado,
      })

      await experienciaORM.save(experiencia)
    } catch {}
  }

  public async obtenerPorIdEmpleado(
    idEmpleado: string,
  ): Promise<ExperienciaLaboralPersitenciaDTO[]> {
    try {
      const empleadoORM = getRepository(EmpleadoORM)
      const experienciaORM = getRepository(ExperienciaLaboralORM)

      const empleado = await empleadoORM.findOneOrFail({
        where: { uuid: idEmpleado },
      })

      const experiencias =
        (await experienciaORM.find({
          where: { empleado },
        })) || []

      return experiencias.map((experiencia) => {
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
  public async crear(datos: ExperienciaLaboralPersitenciaDTO): Promise<void> {
    try {
      const empleadoORM = getRepository(EmpleadoORM)
      const experienciaORM = getRepository(ExperienciaLaboralORM)

      const empleado = await empleadoORM.findOneOrFail({
        where: { uuid: datos.idEmpleado },
      })

      const experiencia = experienciaORM.create({
        uuid: datos.id,
        cargo: datos.cargo,
        nombre_empresa: datos.nombreEmpresa,
        fecha_inicio: datos.fechaInicio,
        fecha_fin: datos.fechaFin,
        empleado,
      })

      await experienciaORM.insert(experiencia)
    } catch {}
  }
}
