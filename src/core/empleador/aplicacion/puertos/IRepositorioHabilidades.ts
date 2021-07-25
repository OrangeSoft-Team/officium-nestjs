export interface HabilidadPersistenciaDTO {
  id: string
  nombre: string
  categoria: string
}
export interface IRepositorioHabilidades {
  obtenerPorIdEmpresa(id: string): Promise<HabilidadPersistenciaDTO[]>

  obtenerPorIdentificadores(
    identificadores: string[],
  ): Promise<HabilidadPersistenciaDTO[]>

  guardarParaEmpresa(
    habilidades: HabilidadPersistenciaDTO[],
    idEmpresa: string,
  ): Promise<void>
}
