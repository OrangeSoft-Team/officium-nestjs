import {
  Column,
  Entity,
  JoinColumn,
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
  valor_duracion: number

  @Column()
  escala_duracion: string

  @Column()
  intentos_permitidos: number

  @OneToOne(() => CursoORM)
  @JoinColumn({
    name: 'uuid_curso',
   })
  curso: CursoORM

  @OneToMany(() => PreguntaORM, (pregunta) => pregunta.cuestionario)
  preguntas: PreguntaORM[]
}
