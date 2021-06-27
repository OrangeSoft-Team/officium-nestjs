import {
  IRepositorioOfertaLaboral,
  PersistirOfertaLaboralDTO,
} from '../../../aplicacion/puertos/IRepositorioOfertaLaboral'

export class RepositorioOfertaLaboral implements IRepositorioOfertaLaboral {
  public async crear(datos: PersistirOfertaLaboralDTO): Promise<void> {
    return
  }
}
