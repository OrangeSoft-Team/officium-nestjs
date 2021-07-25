import { DatosBasicosEmpleadorApiDTO } from '../../dto/DatosBasicosEmpleador.api.dto'

export class QueryObtenerPerfilEmpresa {
  public constructor(public readonly datos: { idUsuario: string }) {}
}
