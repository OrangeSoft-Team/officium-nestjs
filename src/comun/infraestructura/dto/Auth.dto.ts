export type Auth<T> = {
  [P in keyof T]: T[P]
} & { idUsuario: string }
