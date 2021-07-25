import {
  HabilidadPersistenciaDTO,
  IRepositorioHabilidades,
} from '../../../aplicacion/puertos/IRepositorioHabilidades'

const habilidades = [
  {
    id: '844ea890-8980-4600-950e-c464bc204585',
    nombre: 'Exprimir naranjas',
    categoria: 'Fruteria',
    idEmpresa: '1',
  },
  {
    id: '35302768-e300-4038-a2ab-1c85870b7029',
    nombre: 'Exprimir limones',
    categoria: 'Fruteria',
    idEmpresa: '2',
  },
]

export class RepositorioHabilidades implements IRepositorioHabilidades {
  public async obtenerPorIdEmpresa(
    id: string,
  ): Promise<HabilidadPersistenciaDTO[]> {
    return habilidades.filter((habilidad) => habilidad.idEmpresa == id)
  }

  public async obtenerPorIdentificadores(
    identificadores: string[],
  ): Promise<HabilidadPersistenciaDTO[]> {
    const resultado = []
    for (const id of identificadores) {
      const indice = habilidades.findIndex((habilidad) => habilidad.id == id)
      if (indice != -1) resultado.push(habilidades[indice])
    }
    return resultado
  }

  public async guardarParaEmpresa(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    habilidades: HabilidadPersistenciaDTO[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    idEmpresa: string,
  ): Promise<void> {
    return
  }
}
