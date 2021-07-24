import { getRepository } from 'typeorm'
import { IRepositorioHabilidades } from '../../aplicacion/puertos/IRepositorioHabilidades'
import { EmpleadoORM } from '../persistencia/Empleado.orm'
import { HabilidadORM } from '../persistencia/Habilidad.orm'
import { HabilidadEmpleadoORM } from '../persistencia/HabilidadEmpleado.orm'

export class RepositorioHabilidades implements IRepositorioHabilidades {
  public async obtenerPorIdEmpleado(idEmpleado: string): Promise<string[]> {
    try {
      const habilidadEmpleadoORM = getRepository(HabilidadEmpleadoORM)

      const habilidadesEmpleado = await habilidadEmpleadoORM
        .createQueryBuilder('habEmp')
        .innerJoinAndSelect('habEmp.habilidad', 'habilidad')
        .where('habEmp.uuid_empleado = :idEmpleado', { idEmpleado })
        .getMany()

      return habilidadesEmpleado.map((habEmp) => habEmp.habilidad.uuid)
    } catch {}
  }

  public async actualizarPorIdEmpleado(
    idEmpleado: string,
    idHabilidades: string[],
  ): Promise<void> {
    try {
      const empleadoORM = getRepository(EmpleadoORM)
      const habilidadEmpleadoORM = getRepository(HabilidadEmpleadoORM)
      const habilidadORM = getRepository(HabilidadORM)

      const empleado = await empleadoORM.findOneOrFail({
        where: { uuid: idEmpleado },
      })

      await habilidadEmpleadoORM.delete({ empleado })

      for (const id of idHabilidades) {
        const habilidad = await habilidadORM.findOne({ where: { uuid: id } })
        const habilidadEmpleado = habilidadEmpleadoORM.create({
          empleado,
          habilidad,
        })
        await habilidadEmpleadoORM.save(habilidadEmpleado)
      }
      return
    } catch {}
  }
}
