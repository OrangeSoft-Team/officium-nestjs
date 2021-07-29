import { getRepository } from 'typeorm'
import {
  HabilidadPersistenciaDTO,
  IRepositorioHabilidades,
} from '../../aplicacion/puertos/IRepositorioHabilidades'
import { HabilidadORM } from '../persistencia/Habilidad.orm'

export class RepositorioHabilidades implements IRepositorioHabilidades {
  public async obtenerPorIdEmpleado(
    id: string,
  ): Promise<HabilidadPersistenciaDTO[]> {
    try {
      const habilidadORM = getRepository(HabilidadORM)

      const habilidades = await habilidadORM
        .createQueryBuilder('habilidades')
        .innerJoinAndSelect(
          'habilidades.habilidades_empleados',
          'habilidades_empleados',
        )
        .where('habilidades_empleados.uuid_empleado = :id', { id })
        .getMany()

      return habilidades.map((habilidad) => {
        return {
          id: habilidad.uuid,
          categoria: habilidad.categoria,
          nombre: habilidad.nombre,
        }
      })
    } catch {}
  }
}
