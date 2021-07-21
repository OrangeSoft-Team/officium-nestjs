import { getRepository } from 'typeorm'
import {
  DireccionPersistenciaDTO,
  IRepositorioDirecciones,
} from '../../aplicacion/puertos/IRepositorioDirecciones'
import { CiudadORM } from '../persistencia/Ciudad.orm'
import { DireccionORM } from '../persistencia/Direccion.orm'

export class RepositorioDirecciones implements IRepositorioDirecciones {
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
    } catch (error) {
      console.log(error)
    }
  }
}
