import { compare } from 'bcrypt'
import { getRepository } from 'typeorm'
import {
  DatosAutentificacionPersistenciaDTO,
  InformacionSesionPersistenciaDTO,
  IRepositorioAdministradores,
} from '../../aplicacion/puertos/IRepositorioAdministradores'
import { AdministradorORM } from '../persistencia/Administrador.orm'

export class RepositorioAdministradores implements IRepositorioAdministradores {
  public async autentificar(
    query: DatosAutentificacionPersistenciaDTO,
  ): Promise<InformacionSesionPersistenciaDTO> {
    try {
      const administradorORM = getRepository(AdministradorORM)

      const administrador = await administradorORM.findOneOrFail({
        where: {
          correo_electronico: query.correoElectronico,
        },
      })

      return {
        id: administrador.uuid,
        primerNombre: administrador.primer_nombre,
        primerApellido: administrador.primer_apellido,
        valido: await compare(query.token, administrador.token),
      }
    } catch {
      return {
        valido: false,
      }
    }
  }
}
