export abstract class Excepcion extends Error {
  public constructor(
    protected readonly valor: any,
    protected readonly error: string,
  ) {
    super()
  }

  public getError() {
    return {
      valor: this.valor,
      error: this.error,
    }
  }
}
