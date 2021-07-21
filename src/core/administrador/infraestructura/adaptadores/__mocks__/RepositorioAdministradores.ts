import {
  DatosAutentificacionPersistenciaDTO,
  InformacionSesionPersistenciaDTO,
  IRepositorioAdministradores,
} from '../../../aplicacion/puertos/IRepositorioAdministradores'

const administradores = [{ correo: 'admin@officium.com', token: '1', id: '1' }]

export class RepositorioAdministradores implements IRepositorioAdministradores {
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
