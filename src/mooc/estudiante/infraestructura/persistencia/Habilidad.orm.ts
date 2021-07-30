import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { CursoORM } from './Curso.orm'

@Entity('habilidades')
export class HabilidadORM {
  @PrimaryColumn('uuid')
  uuid: string

  @Column()
  nombre: string

  @Column()
  categoria: string

  @ManyToOne(
    () => CursoORM,
    (curso) => curso.habilidades,
  ) 
  @JoinColumn({ name: 'uuid_curso' })
  curso: CursoORM
}