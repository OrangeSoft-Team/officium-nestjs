import { getRepository } from 'typeorm'
import {
  EstadoPersistenciaDTO,
  IRepositorioUbicaciones,
  PaisPersistenciaDTO,
} from '../../aplicacion/puertos/IRepositorioUbicaciones'
import { EstadoORM } from '../persistencia/Estado.orm'
import { PaisORM } from '../persistencia/Pais.orm'

export class RepositorioUbicaciones implements IRepositorioUbicaciones {
  public async listarEstadosPorIdPais(
    id: string,
  ): Promise<EstadoPersistenciaDTO[]> {
    try {
      const estadoORM = getRepository(EstadoORM)

      const estados = await estadoORM
        .createQueryBuilder('estados')
        .where('estados.uuid_pais = :id', { id })
        .getMany()

      return estados?.map((estado) => {
        return {
          id: estado.uuid,
          nombre: estado.nombre,
        }
      })
    } catch {}
  }

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
