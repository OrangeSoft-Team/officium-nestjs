export interface CertificadosPersistenciaPeticionDTO {
    uuidEstudiante: string;
}

export interface CertificadoDetallePersistenciaPeticionDTO {
    uuidCertificado: string;
}

export interface CertificadosPersistenciaDTO {
    uuid: string
    titulo: string
    fechaExpedicion: Date
}

export interface CertificadoDetallePersistenciaDTO {
    uuid: string
    titulo: string
    fechaExpedicion: Date
    descripcion: string
}

export interface IRepositorioCertificados {
    listar(query: CertificadosPersistenciaPeticionDTO): Promise<CertificadosPersistenciaDTO[]>
    consultar(query: CertificadoDetallePersistenciaPeticionDTO): Promise<CertificadoDetallePersistenciaDTO>
}