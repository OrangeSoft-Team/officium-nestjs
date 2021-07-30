import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from 'typeorm'
import { CursoORM } from './Curso.orm'
import { PreguntaORM } from './Pregunta.orm'

@Entity('cuestionarios')
export class CuestionarioORM {
  @PrimaryColumn('uuid')
  uuid: string

  @Column()
  duracionEstimadaEscala: string

  @Column()
  duracionEstimadaValor: number

  @Column()
  intentosPermitidos: number

   @OneToMany(
    () => PreguntaORM,
    (pregunta) => pregunta.cuestionario,
  )
  preguntas: PreguntaORM[]  

  @OneToOne(
    () => CursoORM,
    (curso) => curso.cuestionario,
  )
  @JoinColumn({
    name: 'uuid_curso',
  })
  curso: CursoORM  

}