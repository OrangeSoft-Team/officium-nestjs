import {
  EstadoExistePersistenciaDTO,
  IRepositorioEstados,
} from '../../../aplicacion/puertos/IRepositorioEstados'

const estados = [
  {
    id: '10d7e05f-2073-4cc3-a9bd-b1d44fb9ca57',
    nombre: 'Distrito Capital',
    idPais: '8f1e4392-1250-403d-aef8-186455cdb163',
  },
  {
    id: '01c29aa0-c542-4d17-9bc6-d4cc3c9d9ae3',
    nombre: 'Miranda',
    idPais: '8f1e4392-1250-403d-aef8-186455cdb163',
  },
  {
    id: '647e0ef1-88a0-4e9f-a28f-9a419fde102e',
    nombre: 'Zulia',
    idPais: '8f1e4392-1250-403d-aef8-186455cdb163',
  },
]

export class RepositorioEstados implements IRepositorioEstados {
  public async existe(query: EstadoExistePersistenciaDTO): Promise<boolean> {
    return (
      estados.findIndex(
        (estado) =>
          estado.id == query.idEstado && estado.idPais == query.idPais,
      ) != -1
    )
  }
}
