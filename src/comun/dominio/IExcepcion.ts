export interface IValoresExcepcion {
  error: string
  nombre: string
}

export interface IExcepcion {
  readonly error: string
  readonly nombre: string
  getError(): IValoresExcepcion
}
