import { ActualizarHabilidadesEmpleadoApiDTO } from '../../dto/ActualizarHabilidadesEmpleado.api.dto'

export class ComandoActualizarHabilidadesEmpleado {
  public constructor(
    public readonly datos: ActualizarHabilidadesEmpleadoApiDTO & {
      idUsuario: string
    },
  ) {}
}
