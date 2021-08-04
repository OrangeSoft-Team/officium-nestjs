import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { CursoORM } from "./Curso.orm";
import { EstudianteORM } from "./Estudiante.orm";

@Entity('cursos_empleados')
export class CursoEstudianteORM {

    @ManyToOne(() => CursoORM, (curso) => curso.cursos_empleados,{
        primary: true,
    })
    @JoinColumn({ name: 'uuid_curso' })
    curso: CursoORM

    @ManyToOne(() => EstudianteORM, (estudiante) => estudiante.cursos_empleados,{
        primary: true,
    })
    @JoinColumn({ name: 'uuid_empleado' })
    empleado: EstudianteORM
}