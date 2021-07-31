import {
  IRepositorioUbicaciones,
  PaisPersistenciaDTO,
} from '../../../aplicacion/puertos/IRepositorioUbicaciones'

const PAISES = [
  {
    id: '2e01e576-18da-4117-a744-41b463039176',
    nombre: 'Colombia',
  },
  {
    id: 'dc628455-07e6-442a-bb1a-984475145c7c',
    nombre: 'Peru',
  },
  {
    id: 'bfa803c2-4d33-42d1-911d-2bf1e8bde939',
    nombre: 'Venezuela',
  },
]

export class RepositorioUbicaciones implements IRepositorioUbicaciones {
  public async listarPaises(): Promise<PaisPersistenciaDTO[]> {
    return PAISES
  }
}
