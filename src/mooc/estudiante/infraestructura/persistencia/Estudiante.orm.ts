import { Entity, OneToMany, PrimaryColumn } from "typeorm"
import { CertificadoORM } from "./Certificado.orm"
import { CursoORM } from "./Curso.orm"

@Entity('empleados')
export class EstudianteORM {
    @PrimaryColumn('uuid')
    uuid: string

    @OneToMany(() => CertificadoORM, (certificado) => certificado.estudiante)
    certificados: CertificadoORM[]
}