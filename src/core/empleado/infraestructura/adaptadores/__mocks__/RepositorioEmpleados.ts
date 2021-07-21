import {
  EmpleadoPersistenciaDTO,
  DatosAutentificacionPersistenciaDTO,
  EmpleadoExistePersistenciaDTO,
  InformacionSesionPersistenciaDTO,
  IRepositorioEmpleados,
} from '../../../aplicacion/puertos/IRepositorioEmpleados'

const empleados = [{ correo: 'rsca4321@gmail.com', token: '1', id: '1' }]

export class RepositorioEmpleados implements IRepositorioEmpleados {
  public async autentificar(
    query: DatosAutentificacionPersistenciaDTO,
  ): Promise<InformacionSesionPersistenciaDTO> {
    return {
      valido:
        empleados.findIndex(
          (empleado) =>
            empleado.correo == query.correoElectronico &&
            empleado.token == query.token,
        ) != -1,
      id: empleados[
        empleados.findIndex(
          (empleado) =>
            empleado.correo == query.correoElectronico &&
            empleado.token == query.token,
        )
      ]?.id,
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async crear(comando: EmpleadoPersistenciaDTO): Promise<void> {
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
