export interface CertificadosPersistenciaPeticionDTO {
    uuidEstudiante: string;
}

export interface CertificadosPersistenciaDTO {
    uuid: string
    titulo: string
    fechaExpedicion: Date
}

export interface IRepositorioCertificados {
    listar(query: CertificadosPersistenciaPeticionDTO): Promise<CertificadosPersistenciaDTO[]>
}