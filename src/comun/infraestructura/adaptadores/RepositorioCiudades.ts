import { getRepository } from 'typeorm'
import { IdentificadorDTO } from '../../aplicacion/dto/Identificador.dto'
import { ExcepcionAplicacion } from '../../aplicacion/ExcepcionAplicacion'
import {
  CiudadPersistenciaDTO,
  IRepositorioCiudades,
} from '../../aplicacion/puertos/IRepositorioCiudades'
import { CiudadORM } from '../persistencia/Ciudad.orm'
import { EstadoORM } from '../persistencia/Estado.orm'

export class RepositorioCiudades implements IRepositorioCiudades {
  public async obtenerPorEstado(
    solicitud: IdentificadorDTO,
  ): Promise<CiudadPersistenciaDTO[]> {
    try {
      // Obtenemos al estado involucrado
      const estado = await getRepository(EstadoORM).findOne({
        where: { uuid: solicitud.id },
      })
      const ciudades = await getRepository(CiudadORM).find({
        where: { estado },
      })
      // retornamos las ciudades
      return ciudades.map((ciudad) => {
        return {
          idCiudad: ciudad.uuid,
          idEstado: estado.uuid,
          nombreCiudad: ciudad.nombre,
        }
      })
    } catch (error) {
      // En caso de que suceda algun error al obtener las ciudades
      throw new ExcepcionAplicacion(
        'No se ha podido obtener las ciudades del estado.',
      )
    }
  }
}
