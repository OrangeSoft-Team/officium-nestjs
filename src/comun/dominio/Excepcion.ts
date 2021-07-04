export abstract class Excepcion extends Error {
  public constructor(
    protected readonly error: string,
    protected readonly nombre: string,
  ) {
    super()
  }

  public getError() {
    return {
      error: this.error,
      nombre: this.nombre,
    }
  }
}
