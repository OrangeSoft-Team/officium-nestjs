import {
  EmpleadoPersistenciaDTO,
  DatosAutentificacionPersistenciaDTO,
  EmpleadoExistePersistenciaDTO,
  InformacionSesionPersistenciaDTO,
  IRepositorioEmpleados,
} from '../../../aplicacion/puertos/IRepositorioEmpleados'

const empleados = [
  {
    correoElectronico: 'rsca4321@gmail.com',
    token: '1',
    id: '1',
    primerNombre: 'Jose',
    primerApellido: 'Perez',
    segundoNombre: 'Antonio',
    segundoApellido: 'Gomez',
    telefono: '+584141548952',
    nivelEducativo: 'SECUNDARIA',
    estatus: 'DISPONIBLE',
    genero: 'MASCULINO',
    fechaNacimiento: new Date('06-16-1998'),
    idDireccion: 'afb61c15-9b56-41c1-b478-e44d225e5f35',
  },
]

export class RepositorioEmpleados implements IRepositorioEmpleados {
  public async obtener(id: string): Promise<EmpleadoPersistenciaDTO> {
    const indice = empleados.findIndex((empleado) => empleado.id == id)
    return empleados[indice]
  }
  public async autentificar(
    query: DatosAutentificacionPersistenciaDTO,
  ): Promise<InformacionSesionPersistenciaDTO> {
    return {
      valido:
        empleados.findIndex(
          (empleado) =>
            empleado.correoElectronico == query.correoElectronico &&
            empleado.token == query.token,
        ) != -1,
      id: empleados[
        empleados.findIndex(
          (empleado) =>
            empleado.correoElectronico == query.correoElectronico &&
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
        (empleado) => empleado.correoElectronico == query.correoElectronico,
      ) != -1
    )
  }
}
