import { getRepository } from 'typeorm'
import { DireccionORM } from '../../../empleador/infraestructura/persistencia/Direccion.orm'
import {
  DireccionPersistenciaDTO,
  IRepositorioDirecciones,
} from '../../aplicacion/puertos/IRepositorioDirecciones'
import { CiudadORM } from '../persistencia/Ciudad.orm'
import { EstadoORM } from '../persistencia/Estado.orm'
import { PaisORM } from '../persistencia/Pais.orm'

export class RepositorioDirecciones implements IRepositorioDirecciones {
  public async verificarPais(id: string): Promise<boolean> {
    try {
      const paisORM = getRepository(PaisORM)

      await paisORM.findOneOrFail({ where: { uuid: id } })

      return true
    } catch {
      return false
    }
  }

  public async verificarEstado(
    idPais: string,
    idEstado: string,
  ): Promise<boolean> {
    try {
      const estadoORM = getRepository(EstadoORM)

      await estadoORM
        .createQueryBuilder('estados')
        .innerJoinAndSelect('estados.pais', 'paises')
        .where('estados.uuid = :idEstado AND paises.uuid = :idPais', {
          idEstado,
          idPais,
        })
        .getOneOrFail()

      return true
    } catch {
      return false
    }
  }

  public async verificarCiudad(
    idEstado: string,
    idCiudad: string,
  ): Promise<boolean> {
    try {
      const ciudadORM = getRepository(CiudadORM)

      await ciudadORM
        .createQueryBuilder('ciudades')
        .innerJoinAndSelect('ciudades.estado', 'estados')
        .where('ciudades.uuid = :idCiudad AND estados.uuid = :idEstado', {
          idCiudad,
          idEstado,
        })
        .getOneOrFail()

      return true
    } catch {
      return false
    }
  }

  public async crear(comando: DireccionPersistenciaDTO): Promise<void> {
    try {
      const ciudadORM = getRepository(CiudadORM)
      const direccionORM = getRepository(DireccionORM)

      const ciudad = await ciudadORM.findOneOrFail({
        where: { uuid: comando.idCiudad },
      })

      const direccion = direccionORM.create({
        uuid: comando.id,
        calle_uno: comando.calleUno,
        calle_dos: comando.calleDos,
        codigo_postal: comando.codigoPostal,
        ciudad,
      })

      await direccionORM.insert(direccion)
    } catch {}
  }

  public async obtenerPorId(id: string): Promise<DireccionPersistenciaDTO> {
    try {
      const direccionORM = getRepository(DireccionORM)

      const direccion = await direccionORM
        .createQueryBuilder('direcciones')
        .innerJoinAndSelect('direcciones.ciudad', 'ciudades')
        .innerJoinAndSelect('ciudades.estado', 'estados')
        .innerJoinAndSelect('estados.pais', 'paises')
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
        idEstado: estado.uuid,
        idPais: pais.uuid,
      }
    } catch {}
  }
}
