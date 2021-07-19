import {
  IRepositorioPaises,
  PaisExistePersistenciaDTO,
} from '../../../aplicacion/puertos/IRepositorioPaises'

const paises = [
  {
    id: '8f1e4392-1250-403d-aef8-186455cdb163',
    nombre: 'Venezuela',
  },
  {
    id: '9972885a-5848-4b16-8c59-f5532e85c5b0',
    nombre: 'Colombia',
  },
  {
    id: '9f8e8a3d-65af-45ab-9195-8a96edfc47af',
    nombre: 'Brasil',
  },
]

export class RepositorioPaises implements IRepositorioPaises {
  public async existe(query: PaisExistePersistenciaDTO): Promise<boolean> {
    return paises.findIndex((pais) => pais.id == query.id) != -1
  }
}
