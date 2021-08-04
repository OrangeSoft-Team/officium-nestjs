export interface ConsultarDetalleCertificadoQueryDTO {
    uuidCertificado: string
}

export interface ConsultarDetalleCertificadoRespuestaDTO {
    uuid: string
    titulo: string
    fechaExpedicion: Date
    descripcion: string
}