import { Auth } from '../../../../../comun/infraestructura/dto/Auth.dto'

export class QueryObtenerPerfilAdministrador {
  public constructor(public readonly datos: Auth<any>) {}
}
