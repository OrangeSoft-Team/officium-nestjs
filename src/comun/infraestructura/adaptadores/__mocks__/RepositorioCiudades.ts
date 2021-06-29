import { IdentificadorDTO } from '../../../aplicacion/dto/Identificador.dto'
import {
  CiudadPersistenciaDTO,
  IRepositorioCiudades,
} from '../../../aplicacion/puertos/IRepositorioCiudades'

const ciudades = [
  {
    idEstado: '9f4bfd3f-5387-4743-a4f7-2dff53535aae',
    idCiudad: '5af12975-d196-4a81-bd48-a8e551cd050a',
    nombreCiudad: 'Caracas',
  },
  {
    idEstado: '9f4bfd3f-5387-4743-a4f7-2dff53535aae',
    idCiudad: 'c8f862d3-0e8f-4d77-a10b-a7e7d0282d24',
    nombreCiudad: 'Los Teques',
  },
  {
    idEstado: '8aee381f-7d0f-47ab-ae4b-1b1bd76197f9',
    idCiudad: 'e6740864-8940-4180-9c83-54ede5ad7c57',
    nombreCiudad: 'Bogota',
  },
]

export class RepositorioCiudades implements IRepositorioCiudades {
  public async obtenerPorEstado(
    solicitud: IdentificadorDTO,
  ): Promise<CiudadPersistenciaDTO[]> {
    return ciudades.filter((ciudad) => ciudad.idEstado == solicitud.id)
  }
}
