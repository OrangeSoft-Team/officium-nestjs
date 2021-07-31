import { getRepository } from "typeorm";
import { CertificadosPersistenciaDTO, CertificadosPersistenciaPeticionDTO, IRepositorioCertificados } from "../../aplicacion/puertos/IRepositorioCertificados";
import { CertificadoORM } from "../persistencia/Certificado.orm";

export class RepositorioCertificados implements IRepositorioCertificados {

    public async listar(query: CertificadosPersistenciaPeticionDTO): Promise<CertificadosPersistenciaDTO[]> {
        try {
            const certificadoORM = getRepository(CertificadoORM)
            const certificados = await certificadoORM
            .createQueryBuilder('certificados')
            .innerJoinAndSelect('certificados.empleados','estudiante')
            .innerJoinAndSelect('certificados.cursos', 'curso')
            .where('certificados.empleados.uuid = :uuid',{uuid: query.uuidEstudiante})
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