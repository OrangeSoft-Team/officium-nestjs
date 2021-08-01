import { getRepository } from 'typeorm'
import {
  HabilidadPersistenciaDTO,
  IRepositorioHabilidades,
} from '../../aplicacion/puertos/IRepositorioHabilidades'
import { HabilidadORM } from '../persistencia/Habilidad.orm'

export class RepositorioHabilidades implements IRepositorioHabilidades {
  public async listar(): Promise<HabilidadPersistenciaDTO[]> {
    try {
      const habilidadORM = getRepository(HabilidadORM)

      const habilidades = await habilidadORM.find()
      console.log(habilidades)
      return habilidades.map((hab) => {
        return {
          id: hab.uuid,
          nombre: hab.nombre,
          categoria: hab.categoria,
        }
      })
    } catch {
      return []
    }
  }
}
