import { getRepository } from 'typeorm'
import {
  DireccionPersistenciaDTO,
  IRepositorioDirecciones,
} from '../../aplicacion/puertos/IRepositorioDirecciones'
import { DireccionORM } from '../persistencia/Direccion.orm'

export class RepositorioDirecciones implements IRepositorioDirecciones {
  public async obtenerPorId(id: string): Promise<DireccionPersistenciaDTO> {
    try {
      const direccionORM = getRepository(DireccionORM)

      const direccion = await direccionORM
        .createQueryBuilder('direcciones')
        .innerJoinAndSelect('direcciones.ciudad', 'ciudades')
        .innerJoinAndSelect('ciudades.estado', 'estados')
        .innerJoinAndSelect('estados.pais', 'pais')
        .where('direcciones.uuid = :id', { id })
        .getOneOrFail()

      const ciudad = direccion.ciudad
      const estado = ciudad.estado
      const pais = estado.pais

      return {
        id: direccion.uuid,
        calleUno: direccion.calle_uno,
        calleDos: direccion.calle_dos,
        codigoPostal: direccion.codigo_postal,
        idCiudad: ciudad.uuid,
        nombreCiudad: ciudad.nombre,
        idEstado: estado.uuid,
        nombreEstado: estado.nombre,
        idPais: pais.uuid,
        nombrePais: pais.nombre,
      }
    } catch {}
  }
}
