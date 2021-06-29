import { IdentificadorDTO } from '../../../aplicacion/dto/Identificador.dto'
import {
  IRepositorioPaises,
  PaisExisteDTO,
  PaisPersistenciaDTO,
} from '../../../aplicacion/puertos/IRepositorioPaises'

const paises = [
  {
    id: '0e7c5f37-4c67-4a21-96fc-6c23a40f9a61',
    nombre: 'Venezuela',
  },
  {
    id: '8aee381f-7d0f-47ab-ae4b-1b1bd76197f9',
    nombre: 'Colombia',
  },
  {
    id: 'c2928b44-77bc-469e-9f23-8cdb48628dac',
    nombre: 'Ecuador',
  },
]

export class RepositorioPaises implements IRepositorioPaises {
  public async existe(solicitud: IdentificadorDTO): Promise<PaisExisteDTO> {
    return {
      existe: paises.filter((pais) => pais.id == solicitud.id).length > 0,
    }
  }
  public async obtenerTodos(): Promise<PaisPersistenciaDTO[]> {
    return paises
  }
}
