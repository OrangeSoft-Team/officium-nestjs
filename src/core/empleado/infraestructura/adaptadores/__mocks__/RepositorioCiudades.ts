import {
  CiudadExistePersistenciaDTO,
  IRepositorioCiudades,
} from '../../../aplicacion/puertos/IRepositorioCiudades'

const ciudades = [
  {
    id: '984fa2f1-a838-4f43-ab70-2d2f7161a6d9',
    nombre: 'Caracas',
    idEstado: '10d7e05f-2073-4cc3-a9bd-b1d44fb9ca57',
  },
  {
    id: '1c27c171-9919-453b-b198-3d4f29d7c00c',
    nombre: 'San Antonio',
    idEstado: '01c29aa0-c542-4d17-9bc6-d4cc3c9d9ae3',
  },
  {
    id: 'f30f0246-890b-4003-bd0b-650a4a9282a5',
    nombre: 'Los Teques',
    idEstado: '01c29aa0-c542-4d17-9bc6-d4cc3c9d9ae3',
  },
]

export class RepositorioCiudades implements IRepositorioCiudades {
  public async existe(query: CiudadExistePersistenciaDTO): Promise<boolean> {
    return (
      ciudades.findIndex(
        (ciudad) =>
          ciudad.id == query.idCiudad && ciudad.idEstado == query.idEstado,
      ) != -1
    )
  }
}
