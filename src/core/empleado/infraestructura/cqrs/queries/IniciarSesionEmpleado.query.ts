import { DatosInicioSesionEmpleadoApiDTO } from '../../dto/DatosInicioSesionEmpleado.api.dto'

export class QueryIniciarSesionEmpleado {
  public constructor(public readonly datos: DatosInicioSesionEmpleadoApiDTO) {}
}
