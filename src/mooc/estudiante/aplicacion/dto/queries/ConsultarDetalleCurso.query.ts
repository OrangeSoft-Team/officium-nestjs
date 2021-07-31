export interface ConsultarDetalleCursoQueryDTO {
    uuidCurso: string
  }

  export interface LeccionesRespuestaDTO {
    uuid: string
    titulo: string
  }

  export interface HabilidadesRespuestaDTO {
    uuid: string
    nombre: string
    categoria: string
  }

export interface ConsultarDetalleCursoRespuestaDTO {
    uuid: string
    titulo: string
    estatus: string
    valorDuracion:number
    escalaDuracion: string
    fechaCreacion: Date
    lecciones: LeccionesRespuestaDTO[]
    habilidades: HabilidadesRespuestaDTO[]
    fechaUltimaModificacion: Date
  }