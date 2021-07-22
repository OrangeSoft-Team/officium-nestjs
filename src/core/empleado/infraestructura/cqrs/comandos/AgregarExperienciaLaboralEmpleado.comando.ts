import { CrearExperienciaLaboralEmpleadoApiDTO } from '../../dto/CrearExperienciaLaboralEmpleado.api.dto'

export class ComandoAgregarExperienciaLaboral {
  public constructor(
    public readonly datos: CrearExperienciaLaboralEmpleadoApiDTO,
  ) {}
}
