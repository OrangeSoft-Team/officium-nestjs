import {
  CrearEmpleadoPersistenciaDTO,
  EmpleadoExistePersistenciaDTO,
  IRepositorioEmpleados,
} from '../../../aplicacion/puertos/IRepositorioEmpleados'

const empleados = [{ correo: 'rsca4321@gmail.com' }]

export class RepositorioEmpleados implements IRepositorioEmpleados {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async crear(comando: CrearEmpleadoPersistenciaDTO): Promise<void> {
    return
  }

  public async existe(query: EmpleadoExistePersistenciaDTO): Promise<boolean> {
    return (
      empleados.findIndex(
        (empleado) => empleado.correo == query.correoElectronico,
      ) != -1
    )
  }
}
