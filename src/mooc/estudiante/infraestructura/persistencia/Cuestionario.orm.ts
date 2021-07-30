import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm'
import { CursoORM } from './Curso.orm'
import { PreguntaORM } from './Pregunta.orm'

@Entity('cuestionarios')
export class CuestionarioORM {

  @PrimaryColumn({ type: 'uuid' })
  uuid: string

  @Column()
  escala_duracion: string

  @Column()
  valor_duracion: number

  @Column()
  intentos_permitidos: number

  @OneToMany(() => PreguntaORM, (pregunta) => pregunta.cuestionario)
  preguntas: PreguntaORM[]

  @OneToOne(() => CursoORM)
  curso: CursoORM
}
