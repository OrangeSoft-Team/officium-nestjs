import { getRepository } from 'typeorm'
import { IdentificadorDTO } from '../../aplicacion/dto/Identificador.dto'
import { ExcepcionAplicacion } from '../../aplicacion/ExcepcionAplicacion'
import {
  IRepositorioPaises,
  PaisExisteDTO,
  PaisPersistenciaDTO,
} from '../../aplicacion/puertos/IRepositorioPaises'
import { PaisORM } from '../persistencia/Pais.orm'

export class RepositorioPaises implements IRepositorioPaises {
  public async existe(solicitud: IdentificadorDTO): Promise<PaisExisteDTO> {
    try {
      // Obtenemos el pais de la base de datos para verificar su existencia
      const pais = await getRepository(PaisORM).findOne({
        where: { uuid: solicitud.id },
      })
      return { existe: pais?.uuid ? true : false }
    } catch (error) {
      // Si ocurre un error al ejecutar la solicitud
      throw new ExcepcionAplicacion(
        'No se ha podido verificar la existencia del país.',
      )
    }
  }

  public async obtenerTodos(): Promise<PaisPersistenciaDTO[]> {
    try {
      const paises = await getRepository(PaisORM).find()
      return paises.map((pais) => {
        return {
          id: pais.uuid,
          nombre: pais.nombre,
        }
      })
    } catch (error) {
      // En caso de que haya error
      throw new ExcepcionAplicacion('No se ha podido obtener los paises.')
    }
  }
}
