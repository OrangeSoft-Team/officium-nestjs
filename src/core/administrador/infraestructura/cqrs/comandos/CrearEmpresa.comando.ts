import { CrearEmpresaApiDTO } from '../../dto/CrearEmpresa.api.dto'

export class ComandoCrearEmpresa {
  public constructor(public readonly datos: CrearEmpresaApiDTO) {}
}
