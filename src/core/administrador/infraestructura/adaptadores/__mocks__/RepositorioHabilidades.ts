import {
  HabilidadPersistenciaDTO,
  IRepositorioHabilidades,
} from '../../../aplicacion/puertos/IRepositorioHabilidades'

type HabilidadEmpleado = HabilidadPersistenciaDTO & { idEmpleado: string }

const HABILIDADES: HabilidadEmpleado[] = [
  {
    id: '7bb8d302-8fcf-4013-a754-05231ed7ecfe',
    categoria: 'Desarrollo',
    nombre: 'Python',
    idEmpleado: 'ebdb91e8-3a1e-4672-8261-980ca43d8185',
  },
]

export class RepositorioHabilidades implements IRepositorioHabilidades {
  public async obtenerPorIdEmpleado(
    id: string,
  ): Promise<HabilidadPersistenciaDTO[]> {
    return HABILIDADES.filter((habilidad) => habilidad.idEmpleado == id)
  }
}
