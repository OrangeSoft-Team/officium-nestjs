import { getRepository } from 'typeorm'
import {
  CiudadExistePersistenciaDTO,
  IRepositorioCiudades,
} from '../../aplicacion/puertos/IRepositorioCiudades'
import { CiudadORM } from '../persistencia/Ciudad.orm'
import { EstadoORM } from '../persistencia/Estado.orm'

export class RepositorioCiudades implements IRepositorioCiudades {
  public async existe(query: CiudadExistePersistenciaDTO): Promise<boolean> {
    try {
      const estadoORM = getRepository(EstadoORM)
      const ciudadORM = getRepository(CiudadORM)

      const estado = await estadoORM.findOneOrFail({
        where: { uuid: query.idEstado },
      })

      await ciudadORM.findOneOrFail({
        where: { uuid: query.idCiudad, estado },
      })

      return true
    } catch {
      return false
    }
  }
}
