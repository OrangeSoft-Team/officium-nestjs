import {
  IRepositorioPostulaciones,
  PostulacionOfertaPersistenciaDTO,
} from '../../../aplicacion/puertos/IRepositorioPostulaciones'

export class RepositorioPostulaciones implements IRepositorioPostulaciones {
  public async crear(
    postulacion: PostulacionOfertaPersistenciaDTO,
  ): Promise<void> {
    return
  }
}
