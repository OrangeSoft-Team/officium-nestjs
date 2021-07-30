import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { PreguntaORM } from './Pregunta.orm'

@Entity('opciones')
export class OpcionORM {
  @PrimaryColumn('uuid')
  uuid: string

  @Column()
  valor: string

  @Column()
  correcto: boolean

  @ManyToOne(() => PreguntaORM, (pregunta) => pregunta.opciones)
  @JoinColumn({ name: 'uuid_pregunta' })
  pregunta: PreguntaORM
}
