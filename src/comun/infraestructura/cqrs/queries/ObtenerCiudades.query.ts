export class QueryObtenerCiudades {
  public constructor(
    public readonly datos: { idEstado: string; idPais: string },
  ) {}
}
