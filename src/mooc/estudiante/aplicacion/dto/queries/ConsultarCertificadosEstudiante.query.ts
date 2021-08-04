export interface ConsultarCertificadoEstudianteQueryDTO {
    uuidEstudiante: string
}

export interface ConsultarCertificadoEstudianteRespuestaDTO{
    uuid: string
    titulo: string
    fechaExpedicion: Date
}