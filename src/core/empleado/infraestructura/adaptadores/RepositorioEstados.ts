import { getRepository } from 'typeorm'
import {
  EstadoExisteQueryDTO,
  IRepositorioEstados,
} from '../../aplicacion/puertos/IRepositorioEstados'
import { EstadoORM } from '../persistencia/Estado.orm'
import { PaisORM } from '../persistencia/Pais.orm'

export class RepositorioEstados implements IRepositorioEstados {
  public async existe(query: EstadoExisteQueryDTO): Promise<boolean> {
    try {
      const paisORM = getRepository(PaisORM)
      const estadoORM = getRepository(EstadoORM)

      const pais = await paisORM.findOneOrFail({
        where: { uuid: query.idPais },
      })

      await estadoORM.findOneOrFail({
        where: { uuid: query.idEstado, pais },
      })

      return true
    } catch {
      return false
    }
  }
}
