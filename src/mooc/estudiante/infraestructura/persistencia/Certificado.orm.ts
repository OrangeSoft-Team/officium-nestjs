import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { CursoORM } from "./Curso.orm";
import { EstudianteORM } from "./Estudiante.orm";

@Entity('certificados')
export class CertificadoORM {
    @PrimaryColumn('uuid')
    uuid: string

    @Column()
    fecha_expedicion: Date

    @Column()
    descripcion: string

    @ManyToOne(() => CursoORM, (curso) => curso.certificados)
    @JoinColumn({ name: 'uuid_curso' })
    curso: CursoORM

    @ManyToOne(() => EstudianteORM, (estudiante) => estudiante.certificados)
    @JoinColumn({ name: 'uuid_empleado' })
    estudiante: EstudianteORM
}