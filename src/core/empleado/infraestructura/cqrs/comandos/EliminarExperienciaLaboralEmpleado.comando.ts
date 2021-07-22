export class ComandoEliminarExperienciaLaboral {
  public constructor(
    public readonly datos: {
      id: string
      idUsuario: string
    },
  ) {}
}
