import { getRepository } from 'typeorm'
import {
  IRepositorioUbicaciones,
  PaisPersistenciaDTO,
} from '../../aplicacion/puertos/IRepositorioUbicaciones'
import { PaisORM } from '../persistencia/Pais.orm'

export class RepositorioUbicaciones implements IRepositorioUbicaciones {
  public async listarPaises(): Promise<PaisPersistenciaDTO[]> {
    try {
      const paisORM = getRepository(PaisORM)

      const paises = await paisORM.find()

      return (
        paises?.map((pais) => {
          return {
            id: pais.uuid,
            nombre: pais.nombre,
          }
        }) || []
      )
    } catch {}
  }
}
