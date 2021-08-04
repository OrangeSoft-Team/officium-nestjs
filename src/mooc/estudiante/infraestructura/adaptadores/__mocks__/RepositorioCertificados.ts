import { IRepositorioCertificados, CertificadosPersistenciaPeticionDTO, CertificadosPersistenciaDTO, CertificadoDetallePersistenciaDTO, CertificadoDetallePersistenciaPeticionDTO } from "../../../aplicacion/puertos/IRepositorioCertificados";


const listaCertificados = [
    {
        uuid: 'ced7608e-5db6-464e-93d1-ab32f28e809e',
        titulo: 'Matematica basica',
        fechaExpedicion: new Date('09-06-2000'),
    },
]

const certificado = 
    {
        uuid: 'ced7608e-5db6-464e-93d1-ab32f28e809e',
        titulo: 'Matematica basica',
        fechaExpedicion: new Date('09-06-2000'),
        descripcion: 'Este certificado demuestra capacidades en el analisis de funciones'
    }

export class RepositorioCertificados implements IRepositorioCertificados {

    public async consultar(query: CertificadoDetallePersistenciaPeticionDTO): Promise<CertificadoDetallePersistenciaDTO> {
            return certificado
    }

    public async listar(query: CertificadosPersistenciaPeticionDTO): Promise<CertificadosPersistenciaDTO[]> {
            return listaCertificados
    }
}