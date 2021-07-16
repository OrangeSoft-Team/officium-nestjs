export interface ValoresExcepcion {
  error: string
  nombre: string
}

export interface Excepcion extends Error {
  getError(): ValoresExcepcion
}
