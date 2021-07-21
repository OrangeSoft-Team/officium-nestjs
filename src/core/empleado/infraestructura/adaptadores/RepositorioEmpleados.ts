import { compare, hash } from 'bcrypt'
import { getRepository } from 'typeorm'
import {
  DatosAutentificacionPersistenciaDTO,
  EmpleadoExistePersistenciaDTO,
  EmpleadoPersistenciaDTO,
  InformacionSesionPersistenciaDTO,
  IRepositorioEmpleados,
} from '../../aplicacion/puertos/IRepositorioEmpleados'
import { DireccionORM } from '../persistencia/Direccion.orm'
import { EmpleadoORM } from '../persistencia/Empleado.orm'

export class RepositorioEmpleados implements IRepositorioEmpleados {
  public async autentificar(
    query: DatosAutentificacionPersistenciaDTO,
  ): Promise<InformacionSesionPersistenciaDTO> {
    try {
      const empleadoORM = getRepository(EmpleadoORM)

      const empleado = await empleadoORM.findOneOrFail({
        where: {
          correo_electronico: query.correoElectronico,
        },
      })

      return {
        id: empleado.uuid,
        primerNombre: empleado.primer_nombre,
        primerApellido: empleado.primer_apellido,
        valido: await compare(query.token, empleado.token),
      }
    } catch {
      return {
        valido: false,
      }
    }
  }

  public async crear(comando: EmpleadoPersistenciaDTO): Promise<void> {
    try {
      const direccionORM = getRepository(DireccionORM)
      const empleadoORM = getRepository(EmpleadoORM)

      const direccion = await direccionORM.findOneOrFail({
        where: { uuid: comando.idDireccion },
      })

      empleadoORM.insert({
        uuid: comando.id,
        correo_electronico: comando.correoElectronico,
        estatus: comando.estatus,
        fecha_nacimiento: comando.fechaNacimiento,
        genero: comando.genero,
        nivel_educativo: comando.nivelEducativo,
        primer_apellido: comando.primerApellido,
        primer_nombre: comando.primerNombre,
        segundo_apellido: comando.segundoApellido,
        segundo_nombre: comando.segundoNombre,
        telefono: comando.telefono,
        token: await hash(comando.token, 10),
        direccion,
      })
    } catch {}
  }

  public async existe(query: EmpleadoExistePersistenciaDTO): Promise<boolean> {
    try {
      const empleadoORM = getRepository(EmpleadoORM)

      await empleadoORM.findOneOrFail({
        where: { correo_electronico: query.correoElectronico },
      })

      return true
    } catch {
      return false
    }
  }
}
