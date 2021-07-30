import { getRepository } from 'typeorm'
import {
  EmpleadoPersistenciaDTO,
  IRepositorioEmpleados,
} from '../../aplicacion/puertos/IRepositorioEmpleados'
import { EmpleadoORM } from '../persistencia/Empleado.orm'

export class RepositorioEmpleados implements IRepositorioEmpleados {
  public async obtenerPorId(id: string): Promise<EmpleadoPersistenciaDTO> {
    try {
      const empleadoORM = getRepository(EmpleadoORM)

      const empleado = await empleadoORM
        .createQueryBuilder('empleados')
        .leftJoinAndSelect('empleados.direccion', 'direcciones')
        .where('empleados.uuid = :id', { id })
        .getOneOrFail()

      return {
        id: empleado.uuid,
        correoElectronico: empleado.correo_electronico,
        estatus: empleado.estatus,
        fechaNacimiento: empleado.fecha_nacimiento,
        genero: empleado.genero,
        primerNombre: empleado.primer_nombre,
        primerApellido: empleado.primer_apellido,
        segundoNombre: empleado.segundo_nombre,
        segundoApellido: empleado.segundo_apellido,
        idDireccion: empleado?.direccion?.uuid || null,
      }
    } catch {}
  }
  public async obtenerTodos(): Promise<EmpleadoPersistenciaDTO[]> {
    try {
      const empleadoORM = getRepository(EmpleadoORM)

      const empleados = await empleadoORM.find()

      return empleados.map((empleado) => {
        return {
          id: empleado.uuid,
          correoElectronico: empleado.correo_electronico,
          estatus: empleado.estatus,
          fechaNacimiento: empleado.fecha_nacimiento,
          genero: empleado.genero,
          primerNombre: empleado.primer_nombre,
          primerApellido: empleado.primer_apellido,
          segundoNombre: empleado.segundo_nombre,
          segundoApellido: empleado.segundo_apellido,
        }
      })
    } catch {}
  }
}
