import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { CursoORM } from './Curso.orm'

@Entity('lecciones')
export class LeccionORM {
  @PrimaryColumn('uuid')
  uuid: string

  @Column()
  titulo: string

  @Column()
  descripcion: string

  @Column()
  contenido: string

  @ManyToOne(
    () => CursoORM,
    (curso) => curso.lecciones,
  ) 
  @JoinColumn({ name: 'uuid_curso' })
  curso: CursoORM
}