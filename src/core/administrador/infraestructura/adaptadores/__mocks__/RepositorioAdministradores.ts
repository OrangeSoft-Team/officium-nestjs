import {
  AdministradorPersistenciaDTO,
  DatosAutentificacionPersistenciaDTO,
  InformacionSesionPersistenciaDTO,
  IRepositorioAdministradores,
} from '../../../aplicacion/puertos/IRepositorioAdministradores'

const administradores = [
  {
    correo: 'admin@officium.com',
    token: '1',
    id: '1',
    primerNombre: 'José',
    primerApellido: 'Perez',
    cargo: 'Gerente',
  },
]

export class RepositorioAdministradores implements IRepositorioAdministradores {
  public async obtenerPorId(id: string): Promise<AdministradorPersistenciaDTO> {
    const indice = administradores.findIndex((admin) => admin.id == id)

    if (indice != -1)
      return {
        correoElectronico: administradores[indice].correo,
        ...administradores[indice],
      }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async editar(datos: AdministradorPersistenciaDTO): Promise<void> {
    return
  }

  public async autentificar(
    query: DatosAutentificacionPersistenciaDTO,
  ): Promise<InformacionSesionPersistenciaDTO> {
    return {
      valido:
        administradores.findIndex(
          (administrador) =>
            administrador.correo == query.correoElectronico &&
            administrador.token == query.token,
        ) != -1,
      id: administradores[
        administradores.findIndex(
          (administrador) =>
            administrador.correo == query.correoElectronico &&
            administrador.token == query.token,
        )
      ]?.id,
    }
  }
}
