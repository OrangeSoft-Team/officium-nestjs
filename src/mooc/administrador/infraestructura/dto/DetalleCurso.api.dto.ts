interface HabilidadesDetalleCursoApiDTO {
  uuid: string
  nombre: string
  categoria: string
}

interface LeccionesDetalleCursoApiDTO {
  uuid: string
  titulo: string
}

export interface DetalleCursoApiDTO {
  uuid: string
  titulo: string
  estatus: string
  valorDuracion: number
  escalaDuracion: string
  fechaCreacion: string
  fechaUltimaModificacion?: string
  lecciones: LeccionesDetalleCursoApiDTO[]
  habilidades: HabilidadesDetalleCursoApiDTO[]
}
