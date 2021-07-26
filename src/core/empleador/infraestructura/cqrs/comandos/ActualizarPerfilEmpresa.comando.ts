import { ActualizarDatosBasicosEmpleadorApiDTO } from '../../dto/ActualizarDatosBasicosEmpleador.api.dto'

export class ComandoActualizarPerfilEmpresa {
  public constructor(
    public readonly datos: ActualizarDatosBasicosEmpleadorApiDTO & {
      idUsuario: string
    },
  ) {}
}
