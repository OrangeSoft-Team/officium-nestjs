import {
  HabilidadPersistenciaDTO,
  IRepositorioHabilidades,
} from '../../../aplicacion/puertos/IRepositorioHabilidades'

const HABILIDADES = [
  {
    id: '9652021a-1f94-4184-81cf-ca4599decf64',
    categoria: 'Desarrollo',
    nombre: 'Python',
  },
  {
    id: 'be1808c7-b341-4807-954f-0bb3b1c92cb0',
    categoria: 'Desarrollo',
    nombre: 'Java',
  },
  {
    id: '9e6574bd-103f-4680-86ad-88b5640ec541',
    categoria: 'Desarrollo',
    nombre: 'DDDD',
  },
]

export class RepositorioHabilidades implements IRepositorioHabilidades {
  public async listar(): Promise<HabilidadPersistenciaDTO[]> {
    return HABILIDADES
  }
}
