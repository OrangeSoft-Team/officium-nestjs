import { DatosRegistroEmpleadoApiDTO } from '../../dto/DatosRegistroEmpleado.api.dto'

export class ComandoRegistrarEmpleado {
  public constructor(public readonly datos: DatosRegistroEmpleadoApiDTO) {}
}
