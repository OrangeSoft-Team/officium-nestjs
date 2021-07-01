export interface PostulacionOfertaPersistenciaDTO {
  id: string
  idOferta: string
  idEmpleado: string
  fecha: Date
  estado: string
  comentario?: string
}

export interface IRepositorioPostulaciones {
  crear(postulacion: PostulacionOfertaPersistenciaDTO): Promise<void>
}
