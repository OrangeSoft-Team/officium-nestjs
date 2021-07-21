import { DatosInicioSesionEmpleadorApiDTO } from '../../dto/DatosInicioSesionEmpleador.api.dto'

export class QueryIniciarSesionEmpresa {
  public constructor(public readonly datos: DatosInicioSesionEmpleadorApiDTO) {}
}
