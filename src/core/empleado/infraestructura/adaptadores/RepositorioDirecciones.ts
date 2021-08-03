import { getRepository } from 'typeorm'
import {
  DireccionPersistenciaDTO,
  IRepositorioDirecciones,
} from '../../aplicacion/puertos/IRepositorioDirecciones'
import { CiudadORM } from '../persistencia/Ciudad.orm'
import { DireccionORM } from '../persistencia/Direccion.orm'

export class RepositorioDirecciones implements IRepositorioDirecciones {
  public async obtener(id: string): Promise<DireccionPersistenciaDTO> {
    try {
      const direccionORM = getRepository(DireccionORM)

      const direccion = await direccionORM
        .createQueryBuilder('direcciones')
        .innerJoinAndSelect('direcciones.ciudad', 'ciudades')
        .innerJoinAndSelect('ciudades.estado', 'estados')
        .innerJoinAndSelect('estados.pais', 'paises')
        .where('direcciones.uuid = :id', { id })
        .getOne()

      const ciudad = direccion.ciudad
      const estado = ciudad.estado
      const pais = estado.pais

      return {
        id: direccion.uuid,
        calleUno: direccion.calle_uno,
        calleDos: direccion.calle_dos,
        codigoPostal: direccion.codigo_postal,
        idCiudad: ciudad.uuid,
        idEstado: estado.uuid,
        idPais: pais.uuid,
      }
    } catch {}
  }

  public async crear(comando: DireccionPersistenciaDTO): Promise<void> {
    try {
      const ciudadORM = getRepository(CiudadORM)
      const direccionORM = getRepository(DireccionORM)

      const ciudad = await ciudadORM.findOneOrFail({
        where: { uuid: comando.idCiudad },
      })

      direccionORM.insert({
        uuid: comando.id,
        calle_uno: comando.calleUno,
        calle_dos: comando.calleDos,
        codigo_postal: comando.codigoPostal,
        ciudad,
      })
    } catch {}
  }
}
