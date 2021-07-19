import {
  CrearDireccionPersistenciaDTO,
  IRepositorioDirecciones,
} from '../../../aplicacion/puertos/IRepositorioDirecciones'

export class RepositorioDirecciones implements IRepositorioDirecciones {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  crear(comando: CrearDireccionPersistenciaDTO): Promise<void> {
    return
  }
}
