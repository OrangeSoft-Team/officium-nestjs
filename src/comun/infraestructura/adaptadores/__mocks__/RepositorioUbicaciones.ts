import {
  CiudadPersistenciaDTO,
  EstadoPersistenciaDTO,
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

const ESTADOS = [
  {
    id: '943be322-5074-4550-9132-90a8a46e660b',
    nombre: 'Distrito Capital',
    idPais: 'bfa803c2-4d33-42d1-911d-2bf1e8bde939',
  },
  {
    id: 'be8bfd7a-3806-46df-9eef-12a449b66878',
    nombre: 'Miranda',
    idPais: 'bfa803c2-4d33-42d1-911d-2bf1e8bde939',
  },
]

const CIUDADES = [
  {
    id: '49569b81-2579-45ac-ada4-ee17eade3145',
    nombre: 'Caracas',
    idPais: 'bfa803c2-4d33-42d1-911d-2bf1e8bde939',
    idEstado: '943be322-5074-4550-9132-90a8a46e660b',
  },
  {
    id: 'be8bfd7a-3806-46df-9eef-12a449b66878',
    nombre: 'San Antonio',
    idPais: 'bfa803c2-4d33-42d1-911d-2bf1e8bde939',
    idEstado: 'be8bfd7a-3806-46df-9eef-12a449b66878',
  },
]

export class RepositorioUbicaciones implements IRepositorioUbicaciones {
  public async listarCiudadesPorIdEstado(
    id: string,
  ): Promise<CiudadPersistenciaDTO[]> {
    return CIUDADES.filter((cd) => cd.idEstado == id)
  }

  public async listarEstadosPorIdPais(
    id: string,
  ): Promise<EstadoPersistenciaDTO[]> {
    return ESTADOS.filter((est) => est.idPais == id)
  }
  public async listarPaises(): Promise<PaisPersistenciaDTO[]> {
    return PAISES
  }
}
