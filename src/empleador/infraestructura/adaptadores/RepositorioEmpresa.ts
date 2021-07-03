import { getRepository } from 'typeorm'
import { IdentificadorDTO } from '../../../comun/aplicacion/dto/Identificador.dto'
import { ExcepcionAplicacion } from '../../../comun/aplicacion/ExcepcionAplicacion'
import { EmpresaORM } from '../../../comun/infraestructura/persistencia/Empresa.orm'
import {
  EmpresaExisteDTO,
  IRepositorioEmpresa,
} from '../../aplicacion/puertos/IRepositorioEmpresa'

export class RepositorioEmpresa implements IRepositorioEmpresa {
  public async existe(solicitud: IdentificadorDTO): Promise<EmpresaExisteDTO> {
    try {
      // Obtenemos la empresa de la base de datos para verificar su existencia
      const empresa = await getRepository(EmpresaORM).findOne({
        where: { uuid: solicitud.id },
      })
      return { existe: empresa?.uuid ? true : false }
    } catch (error) {
      // Si ocurre un error al ejecutar la solicitud
      throw new ExcepcionAplicacion(
        null,
        'No se ha podido verificar la existencia de la empresa.',
      )
    }
  }
}
