import { getRepository } from 'typeorm'
import {
  IRepositorioPaises,
  PaisExisteQueryDTO,
} from '../../aplicacion/puertos/IRepositorioPaises'
import { PaisORM } from '../persistencia/Pais.orm'

export class RepositorioPaises implements IRepositorioPaises {
  public async existe(query: PaisExisteQueryDTO): Promise<boolean> {
    try {
      const paisORM = getRepository(PaisORM)
      await paisORM.findOneOrFail({ where: { uuid: query.id } })
      return true
    } catch {
      return false
    }
  }
}
