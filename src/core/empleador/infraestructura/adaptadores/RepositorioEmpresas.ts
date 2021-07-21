import { compare } from 'bcrypt'
import { getRepository } from 'typeorm'
import {
  DatosAutentificacionPersistenciaDTO,
  InformacionSesionPersistenciaDTO,
  IRepositorioEmpresas,
} from '../../aplicacion/puertos/IRepositorioEmpresas'
import { EmpresaORM } from '../persistencia/Empresa.orm'

export class RepositorioEmpresas implements IRepositorioEmpresas {
  public async autentificar(
    query: DatosAutentificacionPersistenciaDTO,
  ): Promise<InformacionSesionPersistenciaDTO> {
    try {
      const empresaORM = getRepository(EmpresaORM)

      console.info(query)

      const empresa = await empresaORM.findOneOrFail({
        where: {
          correo_electronico: query.correoElectronico,
        },
      })
      console.info(empresa)

      console.info(empresa.token)
      console.info(await compare(query.token, empresa.token))

      return {
        id: empresa.uuid,
        nombreEmpresa: empresa.nombre,
        valido: await compare(query.token, empresa.token),
      }
    } catch (e) {
      console.error(e)
      return {
        valido: false,
      }
    }
  }
}
