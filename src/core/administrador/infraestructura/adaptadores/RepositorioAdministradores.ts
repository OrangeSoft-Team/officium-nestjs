import { compare } from 'bcrypt'
import { getRepository } from 'typeorm'
import {
  AdministradorPersistenciaDTO,
  DatosAutentificacionPersistenciaDTO,
  InformacionSesionPersistenciaDTO,
  IRepositorioAdministradores,
} from '../../aplicacion/puertos/IRepositorioAdministradores'
import { AdministradorORM } from '../persistencia/Administrador.orm'

export class RepositorioAdministradores implements IRepositorioAdministradores {
  public async obtenerPorId(id: string): Promise<AdministradorPersistenciaDTO> {
    try {
      const administradorORM = getRepository(AdministradorORM)

      const administrador = await administradorORM.findOneOrFail({
        where: { uuid: id },
      })

      return {
        id: administrador.uuid,
        cargo: administrador.cargo,
        primerApellido: administrador.primer_apellido,
        primerNombre: administrador.primer_nombre,
        correoElectronico: administrador.correo_electronico,
      }
    } catch {}
  }

  public async editar(datos: AdministradorPersistenciaDTO): Promise<void> {
    try {
      const administradorORM = getRepository(AdministradorORM)

      const administrador = await administradorORM.findOneOrFail({
        where: { uuid: datos.id },
      })

      administrador.cargo = datos.cargo
      administrador.primer_nombre = datos.primerNombre
      administrador.primer_apellido = datos.primerApellido

      await administradorORM.save(administrador)
    } catch {}
  }

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
