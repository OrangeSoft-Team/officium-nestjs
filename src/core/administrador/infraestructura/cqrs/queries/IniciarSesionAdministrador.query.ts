import { DatosInicioSesionAdministradorApiDTO } from '../../dto/DatosInicioSesionAdministrador.api.dto'

export class QueryIniciarSesionAdministrador {
  public constructor(
    public readonly datos: DatosInicioSesionAdministradorApiDTO,
  ) {}
}
