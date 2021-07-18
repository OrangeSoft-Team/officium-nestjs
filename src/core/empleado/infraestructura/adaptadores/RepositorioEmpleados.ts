import { getRepository } from 'typeorm'
import {
  CrearEmpleadoComandoDTO,
  EmpleadoExisteQueryDTO,
  IRepositorioEmpleados,
} from '../../aplicacion/puertos/IRepositorioEmpleados'
import { DireccionORM } from '../persistencia/Direccion.orm'
import { EmpleadoORM } from '../persistencia/Empleado.orm'

export class RepositorioEmpleados implements IRepositorioEmpleados {
  public async crear(comando: CrearEmpleadoComandoDTO): Promise<void> {
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
        token: comando.token,
        direccion,
      })
    } catch {}
  }

  public async existe(query: EmpleadoExisteQueryDTO): Promise<boolean> {
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
