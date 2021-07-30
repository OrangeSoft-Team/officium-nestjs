import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm'
import { PreguntaORM } from './Pregunta.orm'

@Entity('cuestionarios')
export class CuestionarioORM {

  @PrimaryColumn({ type: 'uuid' })
  uuid: string

  @Column()
  duracionEstimadaEscala: string

  @Column()
  duracionEstimadaValor: number

  @Column()
  intentosPermitidos: number

  @OneToMany(() => PreguntaORM, (pregunta) => pregunta.cuestionario)
  preguntas: PreguntaORM[]

}
