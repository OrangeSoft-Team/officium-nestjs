import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm"
import { CertificadoORM } from "./Certificado.orm"
import { CursoORM } from "./Curso.orm"
import { CursoEstudianteORM } from "./CursoEstudiante.orm"

@Entity('empleados')
export class EstudianteORM {
    @PrimaryColumn('uuid')
    uuid: string

    @Column()
    estatus: string

    @OneToMany(() => CertificadoORM, (certificado) => certificado.estudiante)
    certificados: CertificadoORM[]

    @OneToMany(() => CursoEstudianteORM, (cursoEstudiante) => cursoEstudiante.empleado)
    cursos_empleados: CursoEstudianteORM[]
}