import { getRepository } from 'typeorm'
import { IdentificadorDTO } from '../../../comun/aplicacion/dto/Identificador.dto'
import { EmpleadoORM } from '../../../comun/infraestructura/persistencia/Empleado.orm'
import {
  EmpleadoExisteDTO,
  IRepositorioEmpleado,
} from '../../aplicacion/puertos/IRepositorioEmpleado'

export class RepositorioEmpleado implements IRepositorioEmpleado {
  public async existe(solicitud: IdentificadorDTO): Promise<EmpleadoExisteDTO> {
    try {
      const empleado = await getRepository(EmpleadoORM).findOne({
        where: { uuid: solicitud.id },
      })
      return { existe: empleado?.uuid ? true : false }
    } catch (error) {}
  }
}
