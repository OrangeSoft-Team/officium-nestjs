import { IdentificadorDTO } from '../../../aplicacion/dto/Identificador.dto'
import {
  EstadoPersistenciaDTO,
  IRepositorioEstados,
} from '../../../aplicacion/puertos/IRepositorioEstados'

const estados = [
  {
    idPais: '0e7c5f37-4c67-4a21-96fc-6c23a40f9a61',
    idEstado: '9f4bfd3f-5387-4743-a4f7-2dff53535aae',
    nombreEstado: 'Miranda',
  },
  {
    idPais: '0e7c5f37-4c67-4a21-96fc-6c23a40f9a61',
    idEstado: 'c1b82967-4751-4d83-8a1d-24fc9e1fbaed',
    nombreEstado: 'Nueva Esparta',
  },
  {
    idPais: '0e7c5f37-4c67-4a21-96fc-6c23a40f9a61',
    idEstado: '050c1c92-06b9-441f-a87e-90cd902870b2',
    nombreEstado: 'Zulia',
  },
  {
    idPais: '8aee381f-7d0f-47ab-ae4b-1b1bd76197f9',
    idEstado: '0f9dbd7d-d41e-4324-a4a6-fc1e322ee127',
    nombreEstado: 'Arauca',
  },
]

export class RepositorioEstados implements IRepositorioEstados {
  public async obtenerPorPais(
    solicitud: IdentificadorDTO,
  ): Promise<EstadoPersistenciaDTO[]> {
    return estados.filter((estado) => estado.idPais == solicitud.id)
  }
}
