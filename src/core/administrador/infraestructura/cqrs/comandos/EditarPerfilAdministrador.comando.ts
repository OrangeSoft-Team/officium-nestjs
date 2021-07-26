import { Auth } from '../../../../../comun/infraestructura/dto/Auth.dto'
import { ActualizarDatosBasicosAdministradorApiDTO } from '../../dto/ActualizarDatosBasicosAdministrador.api.dto'

export class ComandoEditarPerfilAdministrador {
  public constructor(
    public readonly datos: Auth<ActualizarDatosBasicosAdministradorApiDTO>,
  ) {}
}
