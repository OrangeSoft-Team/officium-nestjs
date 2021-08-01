import { getRepository } from "typeorm";
import { CertificadoDetallePersistenciaDTO, CertificadoDetallePersistenciaPeticionDTO, CertificadosPersistenciaDTO, CertificadosPersistenciaPeticionDTO, IRepositorioCertificados } from "../../aplicacion/puertos/IRepositorioCertificados";
import { CertificadoORM } from "../persistencia/Certificado.orm";

export class RepositorioCertificados implements IRepositorioCertificados {


    public async consultar(query: CertificadoDetallePersistenciaPeticionDTO): Promise<CertificadoDetallePersistenciaDTO> {
        try{
            const certificadoORM = getRepository(CertificadoORM)
            const certificado = await certificadoORM
            .createQueryBuilder('certificados')
            .innerJoinAndSelect('certificados.curso', 'curso')
            .where('certificados.uuid = :uuid',{uuid: query.uuidCertificado})
            .getOneOrFail()
            return {
                uuid: certificado.uuid,
                titulo: certificado.curso.titulo,
                fechaExpedicion: certificado.fecha_expedicion,
                descripcion: certificado.descripcion,
            }
        }catch{}
    }

    public async listar(query: CertificadosPersistenciaPeticionDTO): Promise<CertificadosPersistenciaDTO[]> {
        try {
            const certificadoORM = getRepository(CertificadoORM)
            const certificados = await certificadoORM
            .createQueryBuilder('certificados')
            .innerJoinAndSelect('certificados.estudiante','empleado')
            .innerJoinAndSelect('certificados.curso', 'curso')
            .where('empleado.uuid = :uuid',{uuid: query.uuidEstudiante})
            .getMany()

            return certificados?.map((certificado) => {
                return {
                    uuid: certificado.uuid,
                    titulo: certificado.curso.titulo,
                    fechaExpedicion: certificado.fecha_expedicion,
                }
            })
        }catch{}
    }
}