import { getRepository } from 'typeorm'
import { IdentificadorDTO } from '../../aplicacion/dto/Identificador.dto'
import { ExcepcionAplicacion } from '../../aplicacion/ExcepcionAplicacion'
import {
  EstadoPersistenciaDTO,
  IRepositorioEstados,
} from '../../aplicacion/puertos/IRepositorioEstados'
import { EstadoORM } from '../persistencia/Estado.orm'
import { PaisORM } from '../persistencia/Pais.orm'

export class RepositorioEstados implements IRepositorioEstados {
  public async obtenerPorPais(
    solicitud: IdentificadorDTO,
  ): Promise<EstadoPersistenciaDTO[]> {
    try {
      // Obtenemos al pais involucrado
      const pais = await getRepository(PaisORM).findOne({
        where: { uuid: solicitud.id },
      })
      const estados = await getRepository(EstadoORM).find({ where: { pais } })
      // retornamos las estados
      return estados.map((estado) => {
        return {
          idEstado: estado.uuid,
          idPais: pais.uuid,
          nombreEstado: estado.nombre,
        }
      })
    } catch (error) {
      // En caso de que suceda algun error al obtener los estados
      throw new ExcepcionAplicacion(
        'No se ha podido obtener los estados del país.',
      )
    }
  }
}
