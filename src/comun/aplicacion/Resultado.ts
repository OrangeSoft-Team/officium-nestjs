import { Excepcion } from '../dominio/Excepcion'

export class Resultado<T> {
  public readonly esExitoso: boolean
  public readonly error: T | string | undefined
  public readonly valor: T

  private constructor(esExitoso: boolean, valor?: T, error?: T) {
    this.esExitoso = esExitoso
    this.valor = valor
    this.error = error
  }

  public static ok<U>(valor: U): Resultado<U> {
    return new Resultado<U>(true, valor)
  }

  public static falla<U extends Excepcion>(error: Excepcion): Resultado<U> {
    return new Resultado<U | any>(false, null, error)
  }
}
