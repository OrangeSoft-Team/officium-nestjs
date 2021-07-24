export interface IRepositorioHabilidades {
  obtenerPorIdEmpleado(idEmpleado: string): Promise<string[]>
  actualizarPorIdEmpleado(
    idEmpleado: string,
    idHabilidades: string[],
  ): Promise<void>
}
