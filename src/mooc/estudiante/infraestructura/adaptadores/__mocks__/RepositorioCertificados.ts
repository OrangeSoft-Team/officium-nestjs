import { IRepositorioCertificados, CertificadosPersistenciaPeticionDTO, CertificadosPersistenciaDTO } from "../../../aplicacion/puertos/IRepositorioCertificados";


const listaCertificados = [
    {
        uuid: 'ced7608e-5db6-464e-93d1-ab32f28e809e',
        titulo: 'Matematica basica',
        fechaExpedicion: new Date('09-06-2000'),
    },
]

export class RepositorioCertificados implements IRepositorioCertificados {

    public async listar(query: CertificadosPersistenciaPeticionDTO): Promise<CertificadosPersistenciaDTO[]> {
            return listaCertificados
    }
}