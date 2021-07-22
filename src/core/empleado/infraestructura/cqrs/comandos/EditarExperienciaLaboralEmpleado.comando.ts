import { ActualizarExperienciaLaboralEmpleadoApiDTO } from '../../dto/ActualizarExperienciaLaboralEmpleado.api.dto'

export class ComandoEditarExperienciaLaboral {
  public constructor(
    public readonly datos: ActualizarExperienciaLaboralEmpleadoApiDTO & {
      id: string
      idUsuario: string
    },
  ) {}
}
