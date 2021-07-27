import { EditarEmpresaApiDTO } from '../../dto/EditarEmpresa.api.dto'

export class ComandoEditarEmpresa {
  public constructor(
    public readonly datos: EditarEmpresaApiDTO & { idEmpresa: string },
  ) {}
}
