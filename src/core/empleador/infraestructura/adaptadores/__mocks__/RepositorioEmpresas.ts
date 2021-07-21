import {
  DatosAutentificacionPersistenciaDTO,
  InformacionSesionPersistenciaDTO,
  IRepositorioEmpresas,
} from '../../../aplicacion/puertos/IRepositorioEmpresas'

const empresas = [{ correo: 'orange@soft.com', token: '1', id: '1' }]

export class RepositorioEmpresas implements IRepositorioEmpresas {
  public async autentificar(
    query: DatosAutentificacionPersistenciaDTO,
  ): Promise<InformacionSesionPersistenciaDTO> {
    return {
      valido:
        empresas.findIndex(
          (empresa) =>
            empresa.correo == query.correoElectronico &&
            empresa.token == query.token,
        ) != -1,
      id: empresas[
        empresas.findIndex(
          (empresa) =>
            empresa.correo == query.correoElectronico &&
            empresa.token == query.token,
        )
      ]?.id,
    }
  }
}
