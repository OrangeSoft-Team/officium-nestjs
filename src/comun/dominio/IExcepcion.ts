export interface IValoresExcepcion {
  mensaje: string
  origen: string
}

export interface IExcepcion {
  readonly mensaje: string
  readonly origen: string
  getError(): IValoresExcepcion
}
